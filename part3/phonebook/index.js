require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

//define the port using dotenv
const PORT = Number(process.env.PORT) || 3001



//token name = body
morgan.token('body', (req, res) => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/',(request, response) => {
    response.send('<h1>Hello PhoneBook Backend!</h1>')
})
app.get('/api/persons', (request, response,next) => {
    Person.find({}).then(persons=>{
        response.json(persons)
    }).catch(err=>{
        next(err)
    })
})

app.get('/api/persons/:id',(request, response,next) => {
    const id = request.params.id
    Person.findById(id).then(person=>{
        if(person){
            response.json(person)
        }else{
            response.status(404).end()
        }
    }).catch(err=>{
        next(err)
    })
})
app.delete('/api/persons/:id',(request, response,next) => {
    const id = request.params.id
    Person.findByIdAndDelete(id).then(()=>{
        response.status(204).end()
    }).catch(err=>{
        next(err)
    })
})
app.post('/api/persons',(request,response,next)=>{
    const body = request.body
    if(!body.name || !body.number){
        return response.status(400).json({
            error: 'Missing info'
        })
    }
    Person.findOne({name:body.name}).then(exist=>{
        if(exist){
            return response.status(400).json({
                error: 'name must be unique'
            })
        }
        const person = new Person({
            name:body.name,
            number:body.number
        })
        person.save().then(person=>{
            response.json(person)
        }).catch(err=>{
            next(err)
        })
    })
})
app.put('/api/persons/:id',(request,response,next)=>{
    const body = request.body
    const id = request.params.id
    const person = {
        name:body.name,
        number:body.number
    }
    Person.findByIdAndUpdate(id,person,{ new: true , runValidators: true}).then(person=>{
        if(person){
            response.json(person)
        }else{
            response.status(404).end()
        }
    }).catch(err=>{
        next(err)
    })
})
app.get('/info',(request, response) => {
    const date = new Date()
    Person.countDocuments({}).then(count=>{
        const content = `
        <p>Phonebook has info for ${count} people</p>
        <p>${date}</p>
    `
        response.send(content)
    })
})
const errorHandler = (error,request,response,next)=>{
    console.log(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}
app.use(errorHandler)
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})