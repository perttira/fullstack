import React, { useState, useEffect } from 'react'
const Blog = ({ blog }) => {
  
  const [blogVisible, setBlogVisible] = useState(false)

  if(blogVisible === false) {
    var show = 'none'
  }else{
    show = 'block'
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const hideBlogStyle = {
    paddingTop: 10,
    marginBottom: 5,
    display: show
  }

  return(
    <div style={blogStyle} onClick={() => setBlogVisible(!blogVisible)}>
      Blog name: {blog.title} Blog author: {blog.author}
      <div style={hideBlogStyle}>
      Blog url: {blog.url} Blog likes: {blog.likes}
    </div>
    </div>
)}

export default Blog