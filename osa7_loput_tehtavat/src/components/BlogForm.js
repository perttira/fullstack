import React from 'react'
import { connect } from 'react-redux'
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
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const BlogForm = ({
  handleSubmit,
  titleType,
  titleValue,
  authorType,
  authorValue,
  urlType,
  urlValue,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  textType,
  textValue,
  handleTextChange

}) =>  {
  const classes = useStyles()
  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Create new blog
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete=""
            autoFocus
            type={titleType}
            value={titleValue}
            onChange={handleTitleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="author"
            label="Author"
            id="author"
            autoComplete=""
            type={authorType}
            value={authorValue}
            onChange={handleAuthorChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="url"
            label="Url"
            name="url"
            autoComplete="www.example.com"
            type={urlType}
            value={urlValue}
            onChange={handleUrlChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="text"
            label="Text"
            name="text"
            autoComplete=""
            type={textType}
            value={textValue}
            onChange={handleTextChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create blog
          </Button>
          <Grid container>
          </Grid>
        </form>
      </div>
    </Container>

  )
}



const mapStateToProps = (state) => {
  return {
    notify: state.notify,
  }
}
export default connect(null, mapStateToProps)(BlogForm)