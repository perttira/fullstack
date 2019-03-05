const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
// print process.argv
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
})

const url =
  `mongodb+srv://perttira:${password}@pessi-rx9a5.mongodb.net/fullstack?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })

const noteSchema = new mongoose.Schema({
  name: String,
  number: String
  //important: Boolean,
})

const Person = mongoose.model('Person', noteSchema)

const person = new Person({
  name: name,
  number: number,
  //important: true,
})


if(process.argv.length > 3) {
  // metodi tallettaa personin mongodb tietokantaan
  // Metodi palauttaa promisen
  // jolle voidaan rekisteröidä then-metodin avulla tapahtumankäsittelijä
  person.save().then(response => {
    console.log('person saved!')
    console.log("Lisätään " + response.name + " numero " + response.number + " luetteloon")
    mongoose.connection.close();
  })
}else{
  // tulostetaan kaikki personit mongodb tietokannasta
  Person.find({}).then(result => {
    console.log("Puhelinluettelo:")
    result.forEach(person => {
      console.log(person.name ,person.number)
    })
    mongoose.connection.close()
  })
} //if else
