import React, { useState } from 'react'
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

/*
Blog title : {blog.title}
Blog author : {blog.author}
Blog url : {blog.url}
Blog likes : {blog.likes}
Blog text : {blog.text}
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

const SingleBlogView = ({ blog, onClick, handleRemoveBlogClick, user }) => {

  console.log('SingleBlogView.js componentissa')
  const classes = useStyles()

  return(

    <Styles.Container maxWidth="md">
      <Styles.Grid item key={blog.id}>
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
              {blog.text}
            </Styles.Typography>
          </Styles.CardContent>
          <Styles.CardActions>
            <Styles.Button size="small" color="primary" onClick={onClick}>
              Back to blogs
            </Styles.Button>
          </Styles.CardActions>
        </Styles.Card>
      </Styles.Grid>
    </Styles.Container>

  )}

export default SingleBlogView