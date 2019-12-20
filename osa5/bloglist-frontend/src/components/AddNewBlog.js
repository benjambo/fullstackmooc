import React from 'react'
import PropTypes from 'prop-types'

const AddNewBlog = ({ title, author, url, postNewBlog }) => {
  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={postNewBlog}>
        <div>
          title: <input {...title} reset={''} />
        </div>
        <div>
          author: <input {...author} reset={''} />
        </div>
        <div>
          url: <input {...url} reset={''} />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}
AddNewBlog.propTypes = {
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
  postNewBlog: PropTypes.func.isRequired
}

export default AddNewBlog
