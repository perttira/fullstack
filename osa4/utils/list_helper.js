const dummy = (blogs) => {
  // ...
  return 1
}


const totalLikes = (blogs) => {
  return blogs.reduce(function(sum , blog) {
    return sum + blog.likes
  },0)
}



const mostLikes = (blogs) => {
  let likes = 0
  let returnableObject = {}
  blogs.map(function(sum) {
    if(sum.likes > likes) {
      likes = sum.likes
      returnableObject.title = sum.title
      returnableObject.author = sum.author
      returnableObject.likes = sum.likes
    }
  })
  return returnableObject
}


/*    if(sum.likes > likes) {
      likes = sum.likes
      authorObject.title = sum.title
      authorObject.author = sum.author
      authorObject.likes = sum.likes
      console.log('mostlLikes', likes)
      console.log('opjekti', authorObject)
      */


const mostBlogs = (blogs) => {

  const arrayOfAuthors = []

  blogs.map(function(blog) {

    // katsotaan esiintyykö blogi aputaulukossa arrayOfAuthors, jos ei niin talletetaan blogaajan
    // nimi authorObject-olion author attribuutiksi. Lasektaan myös montako kertaa blogaaja esiintyy blogs-taulukossa ja 
    // talletetaan esiintymiskerrat authorObject-olion blogeja attribuutiksi ja talletetaan authorObject olio arrayOfAuthors
    // taulukkoon
    let uusTaulukko = arrayOfAuthors.filter(nimi => {
      return nimi.author === blog.author
    })
    if (uusTaulukko.length === 0 ) {
      let authorObject = {}
      authorObject.author = blog.author
      authorObject.blogeja = blogs.filter(nimi => nimi.author === blog.author).length
      arrayOfAuthors.push(authorObject)
    }
  })
  var palautettava
  let suurin = 0
  arrayOfAuthors.map(function(blogaaja)  {
    if (blogaaja.blogeja >= suurin) {
      suurin = blogaaja.blogeja
      palautettava = blogaaja
    }
  })
  return palautettava
}


module.exports = {
  dummy,
  totalLikes,
  mostLikes,
  mostBlogs
}

/*
      console.log('arrayOfAuthors', arrayOfAuthors)
      console.log('blogs.author ', blog.author)
      console.log('authors ', authors)


if(authorsTwo.author === blog.author){
          console.log('IFFISSÄ')
          authorsTwo.blogs = authors.blogs + 1
          return
        }
        console.log('ELSESSÄ')
        authorObject.author = blog.author
        //authorObject.blogs = authorObject.blogs +1
        arrayOfAuthors.push(authorObject)
      })
      */