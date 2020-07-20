import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const vote = (anecdote) => {
    props.voteAnecdote(anecdote)
    props.setNotification(`You voted '${anecdote.content}'`, 5)
  }

  return (
    <div>
      {props.anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>Vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

// Helper function for filtering and sorting list of anecdotes
const sortAndFilterAnecdotes = ({ anecdotes, filter }) => {
  let filteredAnecdotes
  if (filter) {
    filteredAnecdotes = anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
  } else {
    filteredAnecdotes = anecdotes
  }
  return filteredAnecdotes.sort((a, b) => a.votes < b.votes)
}

const mapStateToProps = (state) => {
  return {
    anecdotes: sortAndFilterAnecdotes(state),
    filter: state.filter
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  { voteAnecdote, setNotification }
)(AnecdoteList)

export default ConnectedAnecdoteList