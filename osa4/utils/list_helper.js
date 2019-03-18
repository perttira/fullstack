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
var opjekti = {}

const mostLikes = (blogs) => {
  blogs.map(function(sum ) {

    if(sum.likes > likes) {
      likes = sum.likes
      opjekti.title = sum.title
      opjekti.author = sum.author
      opjekti.likes = sum.likes
      console.log('mostlLikes', likes)
      console.log('opjekti', opjekti)


    }
  })
  return opjekti

}

module.exports = {
  dummy,
  totalLikes,
  mostLikes
}