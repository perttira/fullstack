import React, { useState } from 'react'
import SingleBlogView from '../components/SingleBlogView'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { spacing } from '@material-ui/system'
import AppBar from '@material-ui/core/AppBar'
import CameraIcon from '@material-ui/icons/PhotoCamera'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Toolbar from '@material-ui/core/Toolbar'
import Styles from'../style.js'
import { BrowserRouter, Route } from 'react-router-dom'




const Blog = ({ blog, handleClick, handleRemoveBlogClick, user }) => {


  const [singleBlogVisible, setSingleBlogVisible] = useState(false)
  const [blogVisible, setBlogVisible] = useState(false)

  console.log('Blog.js key', blog.id)
  console.log('Blog.js singleBlogVisible', singleBlogVisible)

  console.log('Blog.js blog.text', blog.text)

  var text = ''

  if(blogVisible === false) {
    var show = 'none'
    text = 'Show more'
  }else{
    show = 'block'
    text = 'Show less'
  }

  const container = {
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogStyle = {
    border: 'solid',
    borderWidth: 1,
    backgroundColor: '#C1BEBB'
  }

  const hideBlogStyle = {
    display: show
  }

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    )
  }
/*
  const showSingleBlock = () => {
    console.log('showSingleBlock clicked')
    console.log('showSingleBlock blog', blog)
    setSingleBlogVisible(true)
  }
*/
  const useStyles = makeStyles(theme => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }))

  // Remove blog näkyy vain jos kirjautunut käyttäjä on sama kuin blogin luonut käyttäjä
  //console.log('Blog.js user', user)
  //console.log('Blog.js blog', blog)
  //console.log('Blog.js user.id', user.id)
  console.log('Blog.js blog.user.id', blog.user.id)
  if(user.id === blog.user.id) { // TODO kun kirjautunut käyttäjä luo blogin, hänelle ei kuitenkaan näy "remove blog" nappi. Luultavasti tietokannassa luotu id ei päivity frontendille
    var showButton = 'block'
  }else{
    showButton = 'none'
  }
  const hideRemoveStyle = {
    display: showButton
  }
  const classes = useStyles()

  if(singleBlogVisible === true){
    return(
      <div>
        kissa
      </div>
    )
  }else if (singleBlogVisible === false){
    return(
      <Styles.Grid item key={blog.id} xs={12} sm={6} md={4}>
        <Styles.Card className={classes.card} >
          <Styles.CardMedia
            className={classes.cardMedia}
            image="https://source.unsplash.com/random"
            title="Image title"
          />
          <Styles.CardContent className={classes.cardContent}>
            <Styles.Typography variant="h5" component="h2">
              {blog.title}
            </Styles.Typography>
            <Styles.Typography>
              Author: {blog.author}
            </Styles.Typography>
            <Styles.Typography style={hideBlogStyle}>
              {blog.url}
            </Styles.Typography>
            <Styles.Typography style={hideBlogStyle}>
              Likes: {blog.likes}
            </Styles.Typography>
          </Styles.CardContent>
          <Styles.CardActions>
            <Styles.Button size="small" color="primary" onClick={() => setBlogVisible(!blogVisible)} >
              {text}
            </Styles.Button>
            <Styles.Button size="small" color="primary" onClick={() => handleClick(blog)}>
              Show blog
            </Styles.Button>
            <Styles.Button size="small" color="secondary" onClick={() => handleRemoveBlogClick(blog)} style={hideRemoveStyle}>
              Remove blog
            </Styles.Button>
          </Styles.CardActions>
        </Styles.Card>
      </Styles.Grid>
    )}}

export default Blog