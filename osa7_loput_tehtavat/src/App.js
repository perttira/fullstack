import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import  { setNotification } from './reducers/notificationReducer'
import  { acGetBlogs } from './reducers/blogReducer'
import Notification from './components/Notification'
import Blog from './components/Blog'
import SingleBlogView from './components/SingleBlogView'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import  { useField } from './hooks'
import Styles from'./style.js'


const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const [singleBlog, setSingleBlog] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const toggleRef = React.createRef()
  const userField = useField('text')
  const passwordField = useField('text')
  const titleField = useField('text')
  const authorField = useField('text')
  const urlField = useField('text')
  const textField = useField('text')
  const [singleBlogVisible, setSingleBlogVisible] = useState(false)


  /*  Don’t call Hooks inside loops, conditions, or nested functions. Instead, always use Hooks at the top level of your React function.
      Don’t call Hooks from regular JavaScript functions. Instead, you can:

      -Call Hooks from React function components.
      -Call Hooks from custom Hooks

      If you want to run an effect and clean it up only once (on mount and unmount),
      you can pass an empty array ([]) as a second argument. This tells React that your
      effect doesn’t depend on any values from props or state, so it never needs to re-run.
      This isn’t handled as a special case — it follows directly from how the dependencies array always works.


  */
  useEffect(() => {
    props.acGetBlogs()
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

    const username = e.target.username.value
    const password = e.target.password.value

    try {
      const user = await loginService.login({
        username, password
      })

      console.log('App.js handlelogin user :  ', user)
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
    } catch (exception) {
      props.setNotification('käyttäjätunnus tai salasana virheellinen', 5000)
    }
  }

  const handleCreateBlog = async (e) => {
    e.preventDefault()

    /*  toggleRef on viite toggable -komponentin metodiin toggleVisiBility()
        tässä  metodi sulkee togglable -komponentin, eli tässä tapauksessa formin
        jolla luotaisiin uusi blogi heti blogin luomisen jälkeen
    */
    toggleRef.current.toggleVisibility()

    //console.log('App.js handleCreateBlog() e.target', e.target)
    const noteObject = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value,
      text: e.target.text.value,
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
          props.setNotification('New blog '+ noteObject.title + ' added', 5000)
        })
    } catch (exception){
      props.setNotification('Could not add new blog, please try again', 5000)
    }
  }

  const handleLikeBlog = (blog) => {
    const blogObject = {
      id: blog.id,
      user: blog.user.id,
      likes: blog.likes +1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      text: blog.text
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
          props.setNotification('You liked blog: '+ blogObject.title + '', 5000)
        })
    } catch (exception){
      props.setNotification('Could not add new blog, please try again', 5000)
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
            props.setNotification('You removed '+ blog.title + '', 5000)
          })
      } catch (exception){
        props.setNotification('Could not remove blog, please try again', 5000)
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
      <Togglable buttonLabel='Blogs login' className='togglable' ref={toggleRef}>
        <LoginForm className='loginForm'
          userType={userField.type}
          userValue={userField.value}
          handleUsernameChange={userField.onChange}
          passwordType={passwordField.type}
          passwordValue={passwordField.value}
          handlePasswordChange={passwordField.onChange}
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
      <Togglable buttonLabel='Create new blog' className='togglable' ref={toggleRef}>
        <BlogForm className='blogForm' handleClick={handleCreateBlog}
          titleType={titleField.type}
          titleValue={titleField.value}
          authorType={authorField.type}
          authorValue={authorField.value}
          urlType={urlField.type}
          urlValue={urlField.value}
          textType={textField.type}
          textValue={textField.value}
          handleTextChange={textField.onChange}
          handleTitleChange={titleField.onChange}
          handleAuthorChange={authorField.onChange}
          handleUrlChange={urlField.onChange}
          handleSubmit={handleCreateBlog}
        />
      </Togglable>
    )
  }
  const classes = Styles.useStyles()

  /*
  const showSingleBlog = () => {
    setSingleBlogVisible(!singleBlogVisible)
    console.log('showSingleBlog metodissa')
  }
  */

  const setBlogVisibly = () => {
    setSingleBlogVisible(!singleBlogVisible)

  }

  const handleClick = (blog) => {
    setSingleBlog(blog)
    setBlogVisibly()
  }


  if (singleBlogVisible === true) {
    return(
      <SingleBlogView blog={singleBlog} onClick={setBlogVisibly} handleRemoveBlogClick={handleRemoveBlock}/>
    )
  } else  if (user === null) {
    return (
      loginForm()
    )
  } else {

    return(
      <div>
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <div>
            <Notification/>
            <React.Fragment>
              <Styles.AppBar position="relative">
                <Styles.Toolbar>
                  <Styles.CameraIcon className={classes.icon} />
                  <Styles.Typography variant="h6" color="inherit" noWrap>
                    Blogs
                  </Styles.Typography>
                </Styles.Toolbar>
              </Styles.AppBar>
              <main>
                <div className={classes.heroContent}>
                  <Styles.Container maxWidth="md">
                    <Styles.Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                      Welcome to the great Blog Site
                    </Styles.Typography>
                    <Styles.Typography variant="h5" align="center" color="textSecondary" paragraph>
                      &quot;Remove block&quot; -button visible only for authorized user
                    </Styles.Typography>
                  </Styles.Container>
                </div>
                <Styles.Container className={classes.cardGrid} maxWidth="md">
                  <Styles.Grid container spacing={4}>
                    {props.blogs.map( blog => <Blog key={blog.id} blog={blog} handleClick={handleClick} user={user} handleLikeClick={handleLikeBlog} handleRemoveBlogClick={handleRemoveBlock}/>)}
                  </Styles.Grid>
                </Styles.Container>
              </main>
            </React.Fragment>
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

/*

return(
  <div>
    {isLoading ? (
      <div>Loading ...</div>
    ) : (
      <div>
        <Notification message={errorMessage} />
        <React.Fragment>
          <Styles.AppBar position="relative">
            <Styles.Toolbar>
              <Styles.CameraIcon className={classes.icon} />
              <Styles.Typography variant="h6" color="inherit" noWrap>
                Blogs
              </Styles.Typography>
              <span className={classes.toolbarButtons}>
                <Styles.IconButton color="inherit" aria-label="Edit">
                </Styles.IconButton>
                <Styles.IconButton color="inherit" aria-label="Save">
                </Styles.IconButton>
              </span>
              <Styles.Button className={classes.menuButton} size="small" color="secondary" onClick={handleLogout}>
                Logout
              </Styles.Button>
            </Styles.Toolbar>
          </Styles.AppBar>
          <main>
            <div className={classes.heroContent}>
              <Styles.Container maxWidth="md">
                <Styles.Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                  Welcome to the great Blog Site
                </Styles.Typography>
                <Styles.Typography variant="h5" align="center" color="textSecondary" paragraph>
                  &quot;Remove block&quot; -button visible only for authorized user
                </Styles.Typography>
              </Styles.Container>
            </div>
            <Styles.Container className={classes.cardGrid} maxWidth="md">
              <Styles.Grid container spacing={4}>
                {blogs.map(blog => <Blog key={blog.id} blog={blog} handleClick={handleClick} user={user} handleLikeClick={handleLikeBlog} handleRemoveBlogClick={handleRemoveBlock}/>)}
              </Styles.Grid>
            </Styles.Container>
          </main>
        </React.Fragment>
        {createBlog()}
      </div>
    )}
  </div>
)
*/

// export default App

const mapStateToProps = (state) => {
  console.log('mapStateToProps state', state)
  return {
    blogs: state.blogs,
  }
}

const mapDispatchToProps = {
  setNotification,
  acGetBlogs
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
