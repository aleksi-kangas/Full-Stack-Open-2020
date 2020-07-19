import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const incrementGood = () => {
    store.dispatch({ type: 'GOOD' })
  }

  const incrementOk = () => {
    store.dispatch({ type: 'OK' })
  }

  const incrementBad = () => {
    store.dispatch({ type: 'BAD' })
  }

  const zeroCounters = () => {
    store.dispatch({ type: 'ZERO' })
  }

  return (
    <div>
      <button onClick={incrementGood}>Good</button>
      <button onClick={incrementOk}>Neutral</button>
      <button onClick={incrementBad}>Bad</button>
      <button onClick={zeroCounters}>Reset stats</button>
      <div>Good {store.getState().good}</div>
      <div>Neutral {store.getState().ok}</div>
      <div>Bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
