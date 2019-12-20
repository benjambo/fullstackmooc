import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import AddNewBlog from './components/AddNewBlog'
import Togglable from './components/Toggable'
import { useField } from './hooks/'

const Info = ({ msg }) => {
  return <h1> {msg} </h1>
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)
  const userLogin = useField('text', 'Username')
  const userPassword = useField('password', 'Password')
  const title = useField('text', 'Title')
  const author = useField('text', 'Author')
  const url = useField('text', 'Url')

  useEffect(() => {
    blogService.getAll().then(initialBlog => {
      setBlogs(initialBlog)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: userLogin.value,
        password: userPassword.value
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      userLogin.reset()
      userPassword.reset()
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }
  }

  const handleLogOut = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const postNewBlog = async event => {
    event.preventDefault()
    let blog = {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: 0
    }
    try {
      const response = await blogService.create(blog)
      setInfoMessage('A new blog ' + blog.title + ' by ' + blog.author)
      const blogi = await blogService.getAll()
      setBlogs(blogi)
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const loginForm = () => (
    <div className="App">
      <h2>Log in to application</h2>
      {errorMessage !== null && <p>{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...userLogin} reset={''} />
        </div>
        <div>
          password
          <input {...userPassword} reset={''} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
  /*
  title={title}
            author={author}
            url={url}
            setAuthor={setAuthor}
            setTitle={setTitle}
            setUrl={setUrl}
            */

  const userBlogs = user => {
    let filteredBlogs = [...blogs]
    //filteredBlogs = filteredBlogs.filter(blogi => blogi.userId.username == user.username)
    filteredBlogs.sort((a, b) => b.likes - a.likes)
    return (
      <div>
        <h1>blogs</h1>
        {infoMessage !== null && <Info msg={infoMessage} />}
        <span>{user.name} logged in</span>
        <button onClick={handleLogOut}>logout</button>
        <p></p>
        <Togglable label={'new blog'}>
          <AddNewBlog
            title={title}
            author={author}
            url={url}
            postNewBlog={postNewBlog}
          />
        </Togglable>
        {filteredBlogs.map(userblog => (
          <Blog
            blog={userblog}
            key={userblog.id}
            setBlogs={setBlogs}
            user={user}
          />
        ))}
      </div>
    )
  }
  return (
    <div>
      {user === null && loginForm()}
      {user !== null && userBlogs(user)}
    </div>
  )
}

export default App
