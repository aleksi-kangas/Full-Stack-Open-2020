const User = require('../models/user')
const { UserInputError } = require('apollo-server')
const jwt = require('jsonwebtoken')

const typeDef = `
  extend type Mutation {
    login(
      username: String!
      password: String!
    ): Token
  }
  type Token {
    value: String!
  }
`

const resolvers = {
  Mutation: {
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      // User has to exist and the password needs to be correct
      if (!user || args.password !== 'password') {
        throw new UserInputError('Wrong username or password')
      }
      // Return authentication token
      const token = jwt.sign({
        username: user.username,
        id: user._id
      }, process.env.JWT_SECRET)
      return { value: token }
    }
  }
}

module.exports = {
  typeDef, resolvers
}