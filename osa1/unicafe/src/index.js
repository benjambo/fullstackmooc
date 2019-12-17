import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
    if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
        return (
            <p>No feedback given</p>
        )
    }
    else {
        return (
            <div>
                <tr>
                    <td>{props.text}</td>
                    <td>{props.value}</td>
                </tr>
            </div>
        )
    }
}

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good++)
  }

  const handleNeutralClick = () => {
      setNeutral(neutral++)
  }

  const handleBadClick = () => {
      setBad(bad++)
  }

  return (
    <div>
      <h2>give feedback</h2>
        <Button onClick={handleGoodClick} text='good'/>
        <Button onClick={handleNeutralClick} text='neutral'/>
        <Button onClick={handleBadClick} text='bad'/>
    <h2>statistics</h2>
        <table>
            <tbody>
                <Statistics text={"good"} value  = {good} />
                <Statistics text={"neutral"} value  = {neutral} />
                <Statistics text={"bad"} value  = {bad} />
                <Statistics text={"all"} value  = {good + neutral + bad} />
                <Statistics text={"average"} value  = {((good * 1) + (neutral * 0) + 
                    (bad * -1)) / (good + neutral + bad)} />
                <Statistics text={"positive"} value  = {good * 100 / 
                    (good + neutral + bad)} />
            </tbody>
        </table>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
