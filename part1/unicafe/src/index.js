import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>Give Feedback</h1>
            <Button handleClick={() => setGood(good + 1)} text={"Good"} />
            <Button handleClick={() => setNeutral(neutral + 1)} text={"Neutral"} />
            <Button handleClick={() => setBad(bad + 1)} text={"Bad"} />
            <Statistics goodCount={good} neutralCount={neutral} badCount={bad} />
        </div>
    )
}

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const Statistic = ({ text, value }) => {
    return (
        <tr>
            <td>
                {text} {value}
            </td>
        </tr>
    )
}

const Statistics = ({ goodCount, neutralCount, badCount }) => {
    const sum = goodCount + neutralCount + badCount

    // Conditional rendering of statistics
    if (sum === 0) {
        return (
            <p>No feedback given</p>
        )
    } else {
        const avg = (1 * goodCount - 1 * badCount) / sum
        const positivePercentage = goodCount / sum * 100 + " %"

        return (
            <div>
                <h1>Statistics</h1>
                <table>
                    <tbody>
                        <Statistic text="Good" value={goodCount} />
                        <Statistic text="Neutral" value={neutralCount} />
                        <Statistic text="Bad" value={badCount} />
                        <Statistic text="All" value={sum}/>
                        <Statistic text="Average" value={avg}/>
                        <Statistic text="Positive" value={positivePercentage}/>
                    </tbody>
                </table>
            </div>
        )
    }
}

ReactDOM.render(<App />,
    document.getElementById('root')
)