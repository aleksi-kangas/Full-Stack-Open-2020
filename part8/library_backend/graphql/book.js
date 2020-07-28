const Author = require('../models/author')
const Book = require('../models/book')
const { AuthenticationError, UserInputError } = require('apollo-server')

const typeDef = `
  extend type Query {
    allBooks(author: String, genre: String): [Book]!
    bookCount: Int!
  }
  extend type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
`

const resolvers = {
  Query: {
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })
        return Book.find({ $and: [
            { genres: { $in: args.genre } },
            { author: { $eq: author } }
          ]}).populate('author')
      } else if (args.author) {
        const author = await Author.findOne({ name: args.author })
        return Book.find({ author: { $eq: author } }).populate('author')
      } else if (args.genre) {
        return Book.find({ genres: { $in: args.genre }}).populate('author')
      } else {
        return Book.find({}).populate('author')
      }
    },
    bookCount: () => Book.collection.countDocuments()
  },
  Mutation: {
    addBook: async (root, args, context) => {
      // User is not logged in
      if (!context.currentUser) {
        throw new AuthenticationError('Authentication failure. Please log in.')
      }
      try {
        let author = await Author.findOne({ name: args.author })
        // Create a new author if not present
        if (!author) {
          const newAuthor = new Author({ name: args.author })
          author = await newAuthor.save()
        }
        // Add a new book
        const newBook = new Book({
          ...args,
          author: author
        })
        return await newBook.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },
  }
}

module.exports = {
  typeDef, resolvers
}