import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

    const addVote = () => {
        const temp = [...votes]
        temp[selected] += 1
        setVotes(temp)
    }

    const indexOfHighestVoted = () => {
        let max = 0
        let indexOfMax = 0
        for (let i = 0; i < votes.length; i++) {
            if (votes[i] > max) {
                max = votes[i];
                indexOfMax = i;
            }
        }
        return (
            indexOfMax
        )
    }

    return (
        <div>
            <div>
                <h1>Anecdote of the day</h1>
                    {props.anecdotes[selected]}
                <p>Has {votes[selected]} votes</p>
                <Button handleClick={() => addVote()} text="Vote" />
                <Button handleClick={() => setSelected(randomNumber)} text="Next anecdote" />
            </div>
            <div>
                <h1>Anecdote with the most votes</h1>
                {anecdotes[indexOfHighestVoted()]}
                <p>Has {votes[indexOfHighestVoted()]} votes</p>
            </div>
        </div>
    )
}

const randomNumber = () => {
    return Math.floor(Math.random() * anecdotes.length)
}

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)