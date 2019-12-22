import React from 'react'
import PropTypes from 'prop-types'

const CreateBlog = ({ title, author, url, postNewBlog }) => {
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
CreateBlog.propTypes = {
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
  postNewBlog: PropTypes.func.isRequired
}

export default CreateBlog
