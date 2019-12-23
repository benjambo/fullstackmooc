import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = props => {
  const addAnecdote = async event => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)

    props.showNotification(`Successfully created: ${content}`, 5000)
  }

  return (
    <div>
      <h2>Create A New Anecdote</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes,
    notify: state.notify
  }
}

const mapDispatchToProps = {
  createAnecdote,
  showNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)
