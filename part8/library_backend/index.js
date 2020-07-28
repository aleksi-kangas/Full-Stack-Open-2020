const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { schema } = require('./graphql/schema')

// Using article as a base of the backend structure
// https://www.apollographql.com/blog/modularizing-your-graphql-schema-code-d7f71d5ed5f2/

mongoose
  .connect(process.env.MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true})
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error:', error.message)
  })


// Context as shown in the material
const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})