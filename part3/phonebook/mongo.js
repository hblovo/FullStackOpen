const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
//connect to MongoDB
const morgan = require('morgan')
mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Person', personSchema)

//only password and show all the records
if(process.argv.length === 3){
  console.log('phonebook:')
  Person.find({}).then((persons) => {
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
  })
} else if(name && number){
  const person = new Person({
    name:name,
    number:number
  })

  person.save().then(() => {
    console.log(person)
    mongoose.connection.close()
  })
}