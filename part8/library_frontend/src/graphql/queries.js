import { gql } from '@apollo/client'
import { BOOK_DETAILS } from './fragments'

// Contains queries used by Apollo Client

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`