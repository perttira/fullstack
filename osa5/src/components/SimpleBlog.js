import React from 'react'





const SimpleBlog = ({ blog, onClick, user }) => {


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
    <div className="blog" style={hideRemoveStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <div>
      blog has {blog.likes} likes
        <button onClick={onClick}>Like</button>
      </div>
    </div>
  )
}

export default SimpleBlog