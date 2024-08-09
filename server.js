const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json())

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { 
    useNewUrlParser : true, 
    useUnifiedTopology: true,
})
.then(()=> console.log('MongoDB database connection established succesfully'))
.catch((err)=> console.error('Failed to connect to MongoDB', err))

const exercisesRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')

app.use('/exercises', exercisesRouter)
app.use('/users', usersRouter)

//start the server
app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`)
})