
const mongoose = require('mongoose')

const password = process.env.PASSWORD

const url = `mongodb+srv://user:${password}@cluster0.knzdzc2.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
personSchema.set("toJSON",{
    transform: (document,returnedPerson)=>{
        returnedPerson.id = returnedPerson._id.toString()
        delete returnedPerson._id
        delete returnedPerson.__v
    }
})

const Person = mongoose.model('Person', personSchema)
module.exports = Person
