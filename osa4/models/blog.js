/*  Koska tietokantayhteyden muodostaminen on siirretty tiedoston app.js:n vastuulle.
    Hakemistossa models oleva tiedosto note.js sisältää nyt ainoastaan muistiinpanojen skeeman määrittelyn.

    Relaatiotietokantojen käytänteistä poiketen viitteet on nyt talletettu molempiin dokumentteihin,
    muistiinpano viittaa sen luoneeseen käyttäjään ja käyttäjä sisältää taulukollisen viitteitä sen
    luomiin muistiinpanoihin.
*/

const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  text: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

/*  We may need to perform a transformation of the resulting object based on some criteria,
    say to remove some sensitive information or return a custom object. In this case we set
    the optional transform function.

    Transform functions receive three arguments

    function (doc, ret, options) {}

    doc The mongoose document which is being converted
    ret The plain object representation which has been converted
    options The options in use (either schema options or the options passed inline) */

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

blogSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Blog', blogSchema)