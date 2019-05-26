import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login' 
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([]) 
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false)
 // const noteFormRef = React.createRef()




  useEffect(() => {
    
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
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
   // noteFormRef.current.toggleVisibility()
    const noteObject = {
      title: e.target.blogTitle.value,
      author: e.target.blogAuthor.value,
      url: e.target.blogUrl.value
    }
    try{
      blogService
      .create(noteObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setNewNote('')
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

    //console.log('noteObject', blogObject.user, blogObject.likes, blogObject.author, blogObject.title, blogObject.url)
    //console.log('blog.user.id', blog.user.id)

    try{
      blogService
      .update(blogObject).then(returnedBlog => {
     
        blogService
        .getAll().then(initialBlogs => {
          setBlogs(initialBlogs)
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

  const handleLogout = (event) => {
    window.storage.removeItem("name")
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
          
          {blogs.map(blog => <Blog key={blog.id} blog={blog} handleClick={handleLikeBlog}/>)}
          
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

Notification = message => {
  return(
    <div>
      <p>{message}</p>
    </div>
  
  )}

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