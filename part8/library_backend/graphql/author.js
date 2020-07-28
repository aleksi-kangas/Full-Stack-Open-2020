const Author = require('../models/author')
const Book = require('../models/book')
const { AuthenticationError, UserInputError } = require('apollo-server')

const typeDef = `
  extend type Query {
    allAuthors: [Author]!
    authorCount: Int!
  }
  extend type Mutation {
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }
`

const resolvers = {
  Author: {
    bookCount: (root) => {
      // root contains the specific author
      return Book.countDocuments({ author: root })
    }
  },
  Query: {
    allAuthors: () => Author.find({}),
    authorCount: () => Author.collection.countDocuments()
  },
  Mutation: {
    editAuthor: async (root, args, context) => {
      // User is not logged in
      if (!context.currentUser) {
        throw new AuthenticationError('Authentication failure. Please log in.')
      }
      if (args.setBornTo === 0) {
        throw new UserInputError(`Born field can't be empty`, { invalidArgs: args })
      }
      try {
        const author = await Author.findOne({ name: args.name })
        if (!author) {
          return null
        }
        // Update author's born attribute with setBornTo argument's value
        author.born = args.setBornTo
        return author.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    }
  }
}

module.exports = {
  typeDef, resolvers
}