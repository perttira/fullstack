import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import  { useField } from './hooks'
import './style.css'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('mluukkai')
  const [password, setPassword] = useState('salainen')
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const blogFormRef = React.createRef()

  /*  Don’t call Hooks inside loops, conditions, or nested functions. Instead, always use Hooks at the top level of your React function.
      Don’t call Hooks from regular JavaScript functions. Instead, you can:

      -Call Hooks from React function components.
      -Call Hooks from custom Hooks
  */
  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        //console.log('intialBlogs', initialBlogs)
        let sortedBlogs = initialBlogs.sort(function (a, b) {
          return b.likes - a.likes
        })
        setBlogs(sortedBlogs)
      })

  }, [])

  /*  Sovellusta on vielä laajennettava siten, että kun sivulle tullaan uudelleen,
      esim. selaimen uudelleenlataamisen yhteydessä, tulee sovelluksen tarkistaa löytyykö
      local storagesta tiedot kirjautuneesta käyttäjästä. Jos löytyy, asetetaan ne 
      sovelluksen tilaan ja noteServicelle
  */
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  /*
      Frontend tallettaa onnistuneen kirjautumisen yhteydessä backendilta saamansa
      tokenin sovelluksen tilan user kenttään token
  */
  const handleLogin = async (e) => {
    e.preventDefault()
    //console.log('App.js handleLogin() e.target', e.target )
    try {
      const user = await loginService.login({
        username, password
      })

      setUser(user)

      setIsLoading(true)

      setTimeout(() => {
        setIsLoading(false)
      }, 1000)

      /*  Laajennetaan sovellusta siten, että se asettaa kirjautuneen käyttäjän tiedot local storageen.
          Koska storageen talletettavat arvot ovat merkkijonoja, emme voi tallettaa storageen suoraan
          Javascript-oliota, vaan ne on muutettava ensin JSON-muotoon metodilla JSON.stringify.
          Vastaavasti kun JSON-muotoinen olio luetaan local storagesta, on se parsittava takaisin
          Javascript-olioksi metodilla JSON.parse. Efektin parametrina oleva tyhjä taulukko varmistaa sen,
          että efekti suoritetaan ainoastaan kun komponentti renderöidään ensimmäistä kertaa.
          Nyt käyttäjä pysyy kirjautuneena sovellukseen ikuisesti. Sovellukseen olisikin kenties syytä
          lisätä logout-toiminnallisuus, joka poistaisi kirjautumistiedot local storagesta. 
          Jätämme kuitenkin uloskirjautumisen harjoitustehtäväksi.
      */
      // window.localStorage.setItem('name', user.name)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

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

    /*  blogFormRef on viite toggable -komponentin metodiin toggleVisiBility()
        tässä  metodi sulkee togglable -komponentin, eli tässä tapauksessa formin
        jolla luotaisiin uusi blogi heti blogin luomisen jälkeen
    */
    blogFormRef.current.toggleVisibility()

    //console.log('App.js handleCreateBlog() e.target', e.target)
    const noteObject = {
      title: e.target.blogTitle.value,
      author: e.target.blogAuthor.value,
      url: e.target.blogUrl.value,
      user: {
        username: user.username,
        name: user.name,
        id: user.id
      },

      likes: 0
    }

    //console.log('App.js handleCreateBlog() noteObject', noteObject)

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

          setErrorMessage('You liked blog: '+ blogObject.title + '')
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
    window.localStorage.removeItem('loggedBlogappUser')
    setUser('')
  }

  /*  Muutoksenkäsittelijä on yksinkertainen, se destrukturoi parametrina tulevasta
      oliosta kentän target ja asettaa sen arvon vastaavaan tilaan. Togglable -komponentti
      vaatii buttonlabelin toimiakseen.
  */
  const loginForm = () => {
    return (
      <Togglable buttonLabel='Blogs login' className='togglable'>
        <LoginForm className='loginForm'
          //username={username}
          //password={password}
          handleUsernameChange={useField.state}
          handlePasswordChange={useField.state}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  /*  Metodilla createRef luodaan ref noteFormRef, joka kiinnitetään muistiinpanojen
      luomislomakkeen sisältävälle Togglable-komponentille. Nyt siis muuttuja blogFormRef toimii
      viitteenä komponenttiin
  */
  const createBlog = () => {
    return (
      <Togglable buttonLabel='Create new blog' className='togglable' ref={blogFormRef}>
        <CreateBlog className='blogForm'handleClick={handleCreateBlog}/>
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
          <div id="container-blogs">
            <div className="blogs-header">
              <h1>Blogs</h1>
              <p>Click blog name for more info. Blogs are arranged in descending order based on how much likes they have.</p>
              <p>&quot;Remove blog&quot; -button visible only for authorized user. User stays logged even if you refresh the page. Use &quot;Logout&quot; -button to log out.</p>
              <Notification message={errorMessage} />
              <p className="logged">Logged user: {user.username}</p>
            </div>
            {blogs.map(blog => <Blog key={blog.id} blog={blog} user={user} handleLikeClick={handleLikeBlog} handleRemoveBlogClick={handleRemoveBlock}/>)}
            {createBlog()}
            <form onSubmit={handleLogout}>
              <button value="logout"type="submit">Logout</button>
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
    <div id="container-blog-form">
      <form id="blog-form" onSubmit={handleSubmitAndHookReset} >
        <div>
          <h1>Create new blog</h1>
          <div id="blog-group-input">
            <div className="blog-input-div">
    Title: <input
                type="text"
                value={blogTitle}
                name="blogTitle"
                onChange={({ target }) => setBlogTitle(target.value)}
                className="blog-input"
              />
            </div>
            <div className="blog-input-div">
    Author: <input
                type="text"
                value={blogAuthor}
                name="blogAuthor"
                onChange={({ target }) => setBlogAuthor(target.value)}
                className="blog-input"
              />
            </div>
            <div className="blog-input-div">
    Url: <input
                type="text"
                value={blogUrl}
                name="blogUrl"
                onChange={({ target }) => setBlogUrl(target.value)}
                className="blog-input"
              />
            </div>
          </div>
        </div>

        <button value="create" className="create">Create blog</button>
      </form>
    </div>
  )
}

export default App