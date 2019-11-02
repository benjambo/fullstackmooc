import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>{text}</button>
)

const Anecdote = (props) => {
    if (props.anecdote === 0) {
        return (
            <>
                <p>{props.anecdote[0]}</p>
                <p>has {props.amount} votes</p>
            </>
        )
    }

    return (
        <div>
            <p>{props.anecdote}</p>
            <p>has {props.amount} votes</p>
        </div>
    )
}

const MostVoted =(props) => {
    const most = props.allVotes.indexOf(Math.max(...props.allVotes))

    return (
        <div>
            <p>{props.anecdote[most]}</p>
            <p>has {props.allVotes[most]} votes</p>
        </div>
    )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState([0,0,0,0,0,0])

  const handleNextClick = () => {
    const randomItem = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomItem)
  }

  const handleVoteClick = () => {
      const voteList = [...vote]
      voteList[selected]++
      setVote(voteList)
  }

  return (
    <div>
        <h2>Anecdote of the day</h2>
            <p>{props.anecdotes[selected]}</p>
            <Anecdote anecdote={selected} amount={vote[selected]} />
            <Button onClick={handleVoteClick} text="vote" />
            <Button onClick={handleNextClick} text="next anecdotes" />
        <h2>Anecdote with most votes</h2>
            <MostVoted anecdote={anecdotes} allVotes={vote} />
    </div>
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