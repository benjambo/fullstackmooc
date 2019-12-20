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
      userId: copyblog.userId.id,
      likes: copyblog.likes + 1
    }
    delete newBlog.id
    const responseBlog = await Blogloader.update(blog.id, newBlog)
    const updateBlogs = await Blogloader.getAll()
    setBlogs(updateBlogs)
  }

  const handleBlogRemove = async () => {
    try {
      if (window.confirm('remove blog ' + blog.title + ' by ' + blog.author)) {
        const response = await Blogloader.remove(blog.id)
        const updateBlogs = await Blogloader.getAll()
        setBlogs(updateBlogs)
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
          {blog.title} {blog.author}{' '}
        </p>
        <a href={blog.url}>{blog.url}</a>
        <p></p>
        <span> {blog.likes} likes </span>
        <button onClick={() => handleLike()}>like</button>
        <p>added by {blog.userId.name}</p>
        {blog.userId.username === user.username && (
          <button onClick={() => handleBlogRemove()}>remove</button>
        )}
      </div>
    )
  }
}

export default Blog
