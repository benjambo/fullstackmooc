import React, { useState } from 'react'
import Blogloader from '../services/blogs'
const Blog = ({ blog, setBlogs, user }) => {
  const [click, setClick] = useState(true)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const handleLike = async () => {
    const copyblog = { ...blog }
    const newBlog = {
      ...copyblog,
      user: copyblog.user.id,
      likes: copyblog.likes + 1
    }
    delete newBlog.id
    const responseBlog = await Blogloader.update(blog.id, newBlog)
    const updateBlogs = await Blogloader.getAll()
    setBlogs(updateBlogs)
    console.log(responseBlog)
  }

  const handleBlogRemove = async () => {
    try {
      if (window.confirm('remove blog ' + blog.title + ' by ' + blog.author)) {
        const response = await Blogloader.remove(blog.id)
        const updateBlogs = await Blogloader.getAll()
        setBlogs(updateBlogs)
        console.log(response)
      }
    } catch (error) {
      console.log(error)
    }
  }
  if (click) {
    return (
      <div
        className="notClicked"
        style={blogStyle}
        onClick={() => setClick(!click)}
      >
        {blog.title} {blog.author}
      </div>
    )
  } else {
    return (
      <div style={blogStyle} className="clicked">
        <p onClick={() => setClick(!click)}>
          {blog.title} by {blog.author}{' '}
        </p>
        <a href={blog.url}>{blog.url}</a>
        <p>
          {' '}
          {blog.likes} likes <button onClick={() => handleLike()}>like</button>{' '}
        </p>

        <p>added by {user.name}</p>
        <button onClick={() => handleBlogRemove()}>remove</button>
      </div>
    )
  }
}

export default Blog
