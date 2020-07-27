const { ApolloServer, gql, AuthenticationError, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()


mongoose
  .connect(process.env.MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true})
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  
  type User {
  username: String!
  favoriteGenre: String!
  id: ID!
  }

  type Token {
    value: String!
  }
  
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
    me: User
  }
  
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
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
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
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
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: (root) => {
      // root contains the specific author
      return Book.countDocuments({ author: root })
    }
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
    editAuthor: async (root, args, context) => {
      // User is not logged in
      if (!context.currentUser) {
        throw new AuthenticationError('Authentication failure. Please log in.')
      }
      try {
        const author = await Author.findOne({ name: args.name })
        if (!author) {
          return null
        }
        // Update author's born attribute with setBornTo argument's value
        author.born = args.setBornTo
        return await author.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },
    createUser: (root, args) => {
      try {
        const user = new User({...args})
        return user.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },
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

// Context as shown in the material
const server = new ApolloServer({
  typeDefs,
  resolvers,
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