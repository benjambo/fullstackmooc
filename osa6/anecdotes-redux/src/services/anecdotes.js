import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async content => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateVote = async id => {
  const anecdotes = await axios.get(baseUrl)
  const url = `${baseUrl}/${id}`
  const anecdote = anecdotes.data.find(n => n.id === id)
  const vote = { ...anecdote, votes: (anecdote.votes += 1) }

  axios.put(url, vote)
}
export default {
  getAll,
  createNew,
  updateVote
}
