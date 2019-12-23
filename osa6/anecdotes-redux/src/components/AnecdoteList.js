import React from 'react'
import { connect } from 'react-redux'
import { castVote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnnecdoteList = props => {
  const vote = (id, content) => {
    props.castVote(id)
    props.showNotification(`Voted: ${content}`, 5000)
  }

  return props.anecdotesToShow.map(anecdote => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id, anecdote.content)}>
          vote
        </button>
      </div>
    </div>
  ))
}

const filterTarget = ({ anecdotes, filter }) =>
  anecdotes.filter(n => n.content.toLowerCase().includes(filter.filter))

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes,
    notify: state.notify,
    anecdotesToShow: filterTarget(state)
  }
}
const mapDispatchToProps = {
  castVote,
  showNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnecdoteList)
