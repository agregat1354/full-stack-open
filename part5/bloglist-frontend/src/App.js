import './index.css'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationClassType, setNotificationClassType] = useState('info')

  const showNotification = (messageText, messageType, durationInSeconds) => {
    setNotificationClassType(messageType)
    setNotificationMessage(messageText)
    setTimeout(() => setNotificationMessage(null), durationInSeconds * 1000)
  }

  useEffect(() => {
    const userJson = window.localStorage.getItem('loggedBlogappUser')
    if (userJson) {
      const user = JSON.parse(userJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])


  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setUsername('')
    setPassword('')
    showNotification('logged out', 'info', 5)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      showNotification('Succesfully logged in', 'info', 5)
    } catch (err) {
      showNotification(err.response.data.error, 'error', 5)
    }
  }

  const handleCreateNewBlog = async (e) => {
    e.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }
    try {
      const responseBlog = await blogService.create(newBlog)
      setBlogs([...blogs, responseBlog])
      showNotification(`a new blog ${responseBlog.title} by ${responseBlog.author} has been added`, 'info', 5)
    } catch (err) {
      showNotification(err.response.data.error, 'error', 5)
    }
  }

  const mainContent = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Notification text={notificationMessage} typeClass={notificationClassType} />
        {user.username} is logged in
        <button onClick={logout}>logout</button>
        <h2>create new</h2>
        <form onSubmit={handleCreateNewBlog}>
          title
          <input
            type="text"
            name="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <br />
          author
          <input
            type="text"
            name="Author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <br />
          url
          <input
            type="text"
            name="Url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          <br />
          <button type="submit">create</button>
        </form>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  const loginForm = () => {
    return (
      <>
        <h2>Log in to application</h2>
        <Notification text={notificationMessage} typeClass={notificationClassType} />
        <form onSubmit={handleLogin}>
          username
          <input
            type="text"
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <br />
          password
          <input
            type='password'
            name='Password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <br />
          <button type='submit'>login</button>
        </form>
      </>
    )
  }

  return (
    <>
      {!user && loginForm()}
      {user && mainContent()}
    </>
  )
}

export default App