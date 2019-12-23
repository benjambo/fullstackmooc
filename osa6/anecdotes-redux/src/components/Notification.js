import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ notify }) => {
  const display = notify

  const notifyVoted = () => {
    return display.message
  }
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notifyVoted()) {
    return <div style={style}>{`${notifyVoted()}`}</div>
  }
  return <div></div>
}
const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes,
    notify: state.notify,
    filter: state.filter
  }
}

export default connect(mapStateToProps)(Notification)
