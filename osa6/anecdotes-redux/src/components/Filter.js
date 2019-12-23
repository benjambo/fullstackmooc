import React from 'react'
import { connect } from 'react-redux'
import { filter } from '../reducers/filterReducer'

const Filter = ({ filter }) => {
  const handleChange = event => {
    filter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      Filter through anecdotes: <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  filter
}

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
