import anecdoteService from '../services/anecdotes'

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const castVote = id => {
  return async dispatch => {
    await anecdoteService.updateVote(id)
    dispatch({
      type: 'VOTE',
      data: {
        id: id
      }
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE':
      const id = action.data.id
      const voteToChange = state.find(n => n.id === id)
      const changedVote = {
        ...voteToChange,
        votes: (voteToChange.votes += 1)
      }
      state.sort(function(a, b) {
        return b.votes - a.votes
      })
      return state.map(vote => (vote.id !== id ? vote : changedVote))
    default:
      return state
  }
}

export default reducer
