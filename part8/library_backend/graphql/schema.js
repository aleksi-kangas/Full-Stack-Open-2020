const { makeExecutableSchema } = require('graphql-tools')
const { merge } = require('lodash')

const { typeDef: authorDef, resolvers: authorResolvers } = require('./author')
const { typeDef: bookDef, resolvers: bookResolvers } = require('./book')
const { typeDef: tokenDef, resolvers: tokenResolvers } = require('./token')
const { typeDef: userDef, resolvers: userResolvers } = require('./user')

const queryDef = `
  type Query {
    _empty: String
  }
`

const mutationDef = `
  type Mutation {
    _empty: String
  }
`

const schema = makeExecutableSchema({
  typeDefs: [queryDef, mutationDef, authorDef, bookDef, tokenDef, userDef],
  resolvers: merge(authorResolvers, bookResolvers, tokenResolvers, userResolvers)
})

module.exports = {
  schema
}