import React, { useState } from 'react'
const Blog = ({ blog, handleLikeClick, handleRemoveBlogClick, user }) => {


  const [blogVisible, setBlogVisible] = useState(false)

  if(blogVisible === false) {
    var show = 'none'
  }else{
    show = 'block'
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


  // Remove blog näkyy vain jos kirjautunut käyttäjä on sama kuin blogin luonut käyttäjä
  console.log('Blog.js user', user)
  console.log('Blog.js blog', blog)
  console.log('Blog.js user.id', user.id)
  console.log('Blog.js blog.user.id', blog.user.id)
  if(user.id === blog.user.id) { // TODO kun kirjautunut käyttäjä luo blogin, hänelle ei kuitenkaan näy "remove blog" nappi. Luultavasti tietokannassa luotu id ei päivity frontendille
    var showButton = 'block'
  }else{
    showButton = 'none'
  }

  const hideRemoveStyle = {
    display: showButton
  }

  return(
    <div id='container' style={container}>
      <div style={blogStyle} onClick={() => setBlogVisible(!blogVisible)} className='blog'>
        <p>Blog name: {blog.title}</p><p>Blog author: {blog.author}</p>
        <div className="hideBlog" style={hideBlogStyle}>
          <p>Blog url: {blog.url}</p><p> Blog likes: {blog.likes}</p>
        </div>
      </div>
      <button value="like "onClick={() => handleLikeClick(blog)}>Like</button>
      <div style={hideRemoveStyle}>
        <button value="remove" onClick={() => handleRemoveBlogClick(blog)} >Remove blog</button>
      </div>
    </div>
  )}

export default Blog