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
    author: String!
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
        console.log("args.author && args.genre");
        console.log(args);
        return Book.find({
          author: args.author,
          genres: { $elemMatch: args.genre },
        });
      }
      if (args.author) {
        console.log("args.author");
        console.log(args);
        return Book.find({ author: args.author });
      }
      if (args.genre) {
        console.log("args.genre");
        console.log(args);
        return Book.find({ genres: { $elemMatch: args.genre } });
      }
      return Book.find({});
    },
    allAuthors: () => authors,
  },
  Author: {
    bookCount: (root) =>
      books.reduce(
        (sum, currBook) => (currBook.author === root.name ? sum + 1 : sum),
        0
      ),
  },
  Mutation: {
    addBook: (root, args) => {
      if (!authors.find((a) => a.name === args.author)) {
        authors.push({ name: args.author, id: uuid() });
      }

      const newBook = {
        title: args.title,
        author: args.author,
        published: args.published,
        genres: args.genres,
        id: uuid(),
      };

      books.push(newBook);
      return newBook;
    },
    editAuthor: (root, args) => {
      const authorToEdit = authors.find((a) => a.name === args.name);
      if (!authorToEdit) return null;
      authorToEdit.born = args.setBornTo;
      return authorToEdit;
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
