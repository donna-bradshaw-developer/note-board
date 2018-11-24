const express = require('express')
const app = express()
require('dotenv').config()

const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')
const authRoutes = require('./routes/authRoutes')
const profileRoutes = require("./routes/profileRoutes")
const noteRoutes = require('./routes/noteRoutes')

const PORT = process.env.PORT || 5510

app.use(morgan('dev'))
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/myboardapp', { useNewUrlParser: true })
    .then(()=> console.log('Successfully Connected to MongoDB'))
    .catch(err => console.log(err))

app.use((err, req, res, next)=>{
    console.error(err)
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.send({message: err.message})
})

app.use('/api', expressJwt({secret: process.env.SECRET}))

app.use('/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/note', noteRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`)
})