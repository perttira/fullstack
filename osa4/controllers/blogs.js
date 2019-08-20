/*  Routejen määrittely siirretään omaan tiedostoonsa
    eli myös siitä tehdään moduuli. Routejen tapahtumankäsittelijöitä
    kutsutaan usein kontrollereiksi. Sovellukselle onkin luotu hakemisto
    controllers ja sinne tiedosto blogs.js, johon kaikki muistiinpanoihin
    liittyvien reittien määrittelyt on siirretty

    Vanha tapa on 'thenittää' asyncroniset kutsut. Metodikutsu Note.find() palauttaa promisen,
    ja saamme itse operaation tuloksen rekisteröimällä promiselle tapahtumankäsittelijän metodilla then.
    Kaikki operaation suorituksen jälkeinen koodi kirjoitetaan tapahtumankäsittelijään

    Käytämme tässä myös async/await tekniikkaa. Awaitin käyttö onnistuu ainoastaan jos
    ollaan async-funktiossa.

    Muutetaan vielä muistiinpanojen luomista, siten että luominen onnistuu ainoastaan jos
    luomista vastaavan pyynnön mukana on validi token. Muistiinpano talletetaan tokenin identifioiman
    käyttäjän tekemien muistiinpanojen listaan. Tapoja tokenin välittämiseen selaimesta backendiin on useita.
     Käytämme ratkaisussamme Authorization-headeria. Tokenin lisäksi headerin avulla kerrotaan mistä autentikointiskeemasta on kyse.
    Tämä voi olla tarpeen, jos palvelin tarjoaa useita eri tapoja autentikointiin.
    Skeeman ilmaiseminen kertoo näissä tapauksissa palvelimelle, miten mukana
    olevat kredentiaalit tulee tulkita. Meidän käyttöömme sopii Bearer-skeema.
    */

const blogsRouter = require('express').Router()  //Tiedosto eksporttaa moduulin käyttäjille määritellyn routerin.Kaikki määriteltävät routet liitetään router-olioon, samaan tapaan kuin aiemmassa versiossa routet liitettiin sovellusta edustavaan olioon.
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



var blogArray = []

// osa4 4.1 blogilista, step1 && 4.2 blogilista, step2

/**
 * Random generator
 * @param {TYPE} arg
 * @return {!Array<TYPE>}
 * @template TYPE
 */
blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
  } catch (error) {
    next(error)
  }
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note.toJSON())
      } else {
        response.status(204).end()
      }
    })
    .catch(error => next(error))
})


/*
    Apufunktio getTokenFrom (yllä) eristää tokenin headerista authorization.
*/
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}


/*  Apufunktio getTokenFrom (yllä) eristää tokenin headerista authorization.
    Tokenin oikeellisuus varmistetaan metodilla jwt.verify. Metodi myös dekoodaa tokenin,
    eli palauttaa olion, jonka perusteella token on laadittu. Tokenista dekoodatun olion
    sisällä on kentät username ja id eli se kertoo palvelimelle kuka pyynnön on tehnyt.
    Jos tokenia ei ole tai tokenista dekoodattu olio ei sisällä käyttäjän identiteettiä
    (eli decodedToken.id ei ole määritelty), palautetaan virheestä kertova statuskoodi
    401 unauthorized ja kerrotaan syy vastauksen bodyssä
*/
blogsRouter.post('/', async (request, response, next) => {

  const body = request.body
  //console.log('blogsRouter.post body', body)
  const token = getTokenFrom(request)

  if(body.title === '' || body.url === ''){
    console.log('EMPTY title tai url')
    return response.json(400, 'bad request')
  }
  if(body.likes === ''){
    body.likes = 0
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user
    })

    //console.log('osa4 blogs.js post() blog', blog)

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())

  } catch(exception) {
    next(exception)
  }
})



blogsRouter.delete('/:id', async (request, response, next) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  console.log('request.params.id', request.params.id)

  const result = await Blog.findOne( { _id: request.params.id } )
  console.log('decodedToken.id', decodedToken.id)
  console.log('result', result)


  if(!result.user.toString() === decodedToken.id.toString() ){
    console.log('Käyttäjä on eri kuin blogin luoja')
    return response.json(400, 'bad request')
  }

  try{
    const result = await Blog.findOneAndDelete( { _id: request.params.id } )
    response.json(result)
  }catch(error){
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {

  const body = request.body

  try {
    const result = await Blog.findByIdAndUpdate(request.params.id, { $set: { title: body.title, author: body.author, url: body.url, likes: body.likes , user: body.user }, }, { new: true })
    response.json(result)

  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter








