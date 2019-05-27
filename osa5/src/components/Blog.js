import React, { useState, useEffect } from 'react'
const Blog = ({ blog, handleLikeClick, handleRemoveBlogClick }) => {
  
  const [blogVisible, setBlogVisible] = useState(false)

  if(blogVisible === false) {
    var show = 'none'
  }else{
    show = 'block'
  }

  const container = {
    paddingBottom: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    backgroundColor: "#C1BEBB"
 
  }

  const hideBlogStyle = {
    paddingTop: 10,
    marginBottom: 5,
    display: show
  }

  return(
    <div style={container}>        
      <div style={blogStyle} onClick={() => setBlogVisible(!blogVisible)}>
        Blog name: {blog.title} Blog author: {blog.author}
        <div style={hideBlogStyle}>
          Blog url: {blog.url} Blog likes: {blog.likes}
        </div>
      </div>
        <button onClick={() => handleLikeClick(blog)} >Like</button>
      <div>
      <button onClick={() => handleRemoveBlogClick(blog)} >Remove blog</button>
      </div>
    </div>

)}

export default Blog