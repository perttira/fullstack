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


const mostBlogLikes = (blogs) => {

  const arrayOfAuthors = []
  console.log('KOIRA', arrayOfAuthors)

  blogs.map(function(blog) {

    // katsotaan esiintyykö blogi aputaulukossa arrayOfAuthors, jos ei niin talletetaan blogaajan
    // nimi authorObject-olion author attribuutiksi. Lasketaan myös montako kertaa blogaaja esiintyy blogs-taulukossa ja
    // talletetaan esiintymiskerrat authorObject-olion blogeja attribuutiksi ja talletetaan authorObject olio arrayOfAuthors
    // taulukkoon
    let uusTaulukko = arrayOfAuthors.filter(nimi => {
      if(nimi.author === blog.author) {
        nimi.likes = nimi.likes + blog.likes
      }
      return nimi.author === blog.author
    })
    console.log('uusTaulukko', uusTaulukko)
    // arrayOfAuthors taulukossa ei ollut blogaajan nimeä
    if (uusTaulukko.length === 0) {
      let authorObject = {}
      authorObject.author = blog.author
      authorObject.likes = blog.likes
      //authorObject.blogeja = blogs.filter(nimi => nimi.author === blog.author).length
      arrayOfAuthors.push(authorObject)
    }
  })
  var palautettava
  let suurin = 0
  // etsitään blogaaja jolla on eniten blogeja
  arrayOfAuthors.map(function(blogaaja)  {
    if (blogaaja.likes >= suurin) {
      suurin = blogaaja.likes
      palautettava = blogaaja
    }
  })
  console.log('PALAUTETTAVA', palautettava)
  return palautettava
}


module.exports = {
  dummy,
  totalLikes,
  mostLikes,
  mostBlogs,
  mostBlogLikes
}