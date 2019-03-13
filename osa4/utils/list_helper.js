const dummy = (blogs) => {
  // ...
  return 1
}


const totalLikes = (blogs) => {
  return blogs.reduce(function(sum , blog) {
    console.log('totalLikes blogs.reduce()', sum)

    return sum + blog.likes

  },0)
}

module.exports = {
  dummy,
  totalLikes
}