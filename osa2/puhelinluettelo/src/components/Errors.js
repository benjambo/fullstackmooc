import React from 'react'

const Errors = ({ wrong }) => {
  if (wrong === null) {
    return null
  }

  return (
    <div className="error">
      {wrong}
    </div>
  )
}

export default Errors