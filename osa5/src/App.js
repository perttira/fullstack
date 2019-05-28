import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login' 
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('mluukkai')
  const [password, setPassword] = useState('salainen')
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        console.log('intialBlogs', initialBlogs)
        let sortedBlogs = initialBlogs.sort(function (a, b) {
          return b.likes - a.likes
        })
        setBlogs(sortedBlogs)
      })

  }, [])

  // ...

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      setUser(user)
      
      setIsLoading(true)
    
      setTimeout(() => {
        setIsLoading(false)
      }, 3000)
  
      window.localStorage.setItem('name', user.name)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('käyttäjätunnus tai salasana virheellinen')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleCreateBlog = async (e) => {
    e.preventDefault()

    const noteObject = {
      title: e.target.blogTitle.value,
      author: e.target.blogAuthor.value,
      url: e.target.blogUrl.value,
      likes: 0
    }

    try{
      blogService
        .create(noteObject).then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setErrorMessage('New blog '+ noteObject.title + ' added')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    } catch (exception){
      setErrorMessage('Could not add new blog, please try again')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLikeBlog = (blog) => {
    const blogObject = {
      id: blog.id,
      user: blog.user.id,
      likes: blog.likes +1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    try{
      blogService
        .update(blogObject).then(() => {
          blogService
            .getAll().then(initialBlogs => {

              let sortedBlogs = initialBlogs.sort(function (a, b) {
                return b.likes - a.likes
              })
              setBlogs(sortedBlogs)
            })

          setErrorMessage('You liked '+ blogObject.title + '')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    } catch (exception){
      setErrorMessage('Could not add new blog, please try again')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleRemoveBlock = (blog) => {

    if (window.confirm('Do you really want to remove this blog?')) {
      try{
        blogService
          .remove(blog.id).then(() => {
            blogService
              .getAll().then(initialBlogs => {
                setBlogs(initialBlogs)
              })

            setErrorMessage('You removed '+ blog.title + '')
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      } catch (exception){
        setErrorMessage('Could not remove blog, please try again')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
    return
  }
  const handleLogout = () => {
    window.storage.removeItem('name')
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  if (user === null) {
    return (
      loginForm()
    )
  }else{
    return(
      <div>
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <div>
            <h2>blogs</h2>
            <Notification message={errorMessage} />
            <p>{user.username} logged in</p>
            {blogs.map(blog => <Blog key={blog.id} blog={blog} user={user} handleLikeClick={handleLikeBlog} handleRemoveBlogClick={handleRemoveBlock}/>)}
            <CreateBlog handleClick={handleCreateBlog}/>
            <form onSubmit={handleLogout}>
              <button type="submit">logout</button>
            </form>
          </div>
        )}
      </div>
    )
  }
}



const CreateBlog = (props) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  function handleSubmitAndHookReset (e) {
    props.handleClick(e)
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return(
    <form onSubmit={handleSubmitAndHookReset} >
      <div>
        <h1>Create new blog</h1>
        <div>
    Title: <input
            type="text"
            value={blogTitle}
            name="blogTitle"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
    Author: <input
            type="text"
            value={blogAuthor}
            name="blogAuthor"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
    Url: <input
            type="text"
            value={blogUrl}
            name="blogUrl"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
      </div>

      <button type="submit">Create blog</button>
    </form>
  )
}

export default App