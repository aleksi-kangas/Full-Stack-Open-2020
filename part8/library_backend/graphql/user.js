const User = require('../models/user')
const { UserInputError } = require('apollo-server')

const typeDef = `
  extend type Query {
    me: User
  }
  extend type Mutation {
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
`

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    createUser: (root, args) => {
      try {
        const user = new User({...args})
        return user.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    }
  }
}

module.exports = {
  typeDef, resolvers
}