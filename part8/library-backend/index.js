const Author = require("./models/Author");
const Book = require("./models/Book");
const User = require("./models/User");
const config = require("./utils/config");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const { v1: uuid } = require("uuid");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log("succesfully connected to mongodb"))
  .catch((error) =>
    console.log("error while connecting to mongodb: ", error.message)
  );
const resetDatabase = require("./utils/resetDatabase");

resetDatabase();

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String!]!
    ): Book!

    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author });
        if (!author) return [];
        return Book.find({
          author: author._id,
          genres: args.genre,
        });
      }
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (!author) return [];
        return Book.find({ author: author._id });
      }
      if (args.genre) {
        return Book.find({ genres: args.genre });
      }
      return Book.find({});
    },
    allAuthors: async () => Author.find({}),
    me: async (root, args, context) => {
      if (!context.user)
        throw new GraphQLError("Invalid token/token not specified");

      return context.user;
    },
  },
  Author: {
    bookCount: async (root) => Book.countDocuments({ author: root.id }),
  },
  Book: {
    author: async (root) => Author.findOne({ _id: root.author }),
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.user) throw new GraphQLError("Unauthorized");
      let author = await Author.findOne({ name: args.author });
      try {
        if (!author) author = await new Author({ name: args.author }).save();
      } catch (error) {
        throw new GraphQLError("Creating author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.author,
            error,
          },
        });
      }

      const newBookObj = {
        title: args.title,
        author: author._id,
        published: args.published,
        genres: args.genres,
      };

      try {
        const savedBook = await new Book(newBookObj).save();
        return savedBook;
      } catch (error) {
        throw new GraphQLError("Creating book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.user) throw new GraphQLError("Unauthorized");
      return Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true, runValidators: true }
      );
    },
    createUser: async (root, args) => {
      const userObj = {
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      };

      const newUser = new User(userObj);
      try {
        const savedUser = await newUser.save();
        return savedUser;
      } catch (error) {
        throw new GraphQLError("Creating user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error,
          },
        });
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "passwd")
        throw new GraphQLError("Login failed, invalid username or password", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });

      const tokenForUser = {
        username: args.username,
        id: user._id,
      };

      const token = { value: jwt.sign(tokenForUser, config.SECRET) };
      return token;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: config.PORT },
  context: async ({ req }) => {
    const authorization = req.headers.authorization;
    if (!authorization) return {};
    const token = authorization.substring(7);
    const decodedToken = jwt.verify(token, config.SECRET);
    if (!decodedToken) return {};
    const user = await User.findById(decodedToken.id);
    if (!user) return {};
    return { user };
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
