const Author = require("./models/Author");
const Book = require("./models/Book");
const config = require("./utils/config");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const { v1: uuid } = require("uuid");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

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
  }

  type Mutation {
    addBook(title: String!, author: String!, published: Int!, genres: [String!]!): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
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
  },
  Author: {
    bookCount: async (root) => Book.countDocuments({ author: root.id }),
  },
  Book: {
    author: async (root) => Author.findOne({ _id: root.author }),
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author });
      if (!author) author = await new Author({ name: args.author }).save();

      console.log("saved author: ", author);

      const newBookObj = {
        title: args.title,
        author: author._id,
        published: args.published,
        genres: args.genres,
      };

      const savedBook = await new Book(newBookObj).save();
      return savedBook;
    },
    editAuthor: async (root, args) => {
      return Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true, runValidators: true }
      );
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: config.PORT },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
