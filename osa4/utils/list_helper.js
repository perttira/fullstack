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

var likes = 0

const mostLikes = (blogs) => {
  blogs.map(function(sum ) {

    if(sum.likes > likes) {
      likes = sum.likes
      console.log('mostlLikes', likes)
    }
  })
  return likes
}

module.exports = {
  dummy,
  totalLikes,
  mostLikes
}