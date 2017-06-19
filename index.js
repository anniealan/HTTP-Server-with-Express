const express = require('express')
const path = require('path')
const PORT = 8080
const app = express()
const router = require('./router')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')

app.set('views', path.join(__dirname, 'public'))
app.set('view engine', 'pug')


app.use(cookieParser('keyboard cat'))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser. json())

app.use(expressValidator());

app.use(logger('dev'))

//middleware that sets current time to the cookie

app.use('/', (req, res, next)=>{
  const time = new Date()
  if(!req.cookies.time){
    res.cookie('time', time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds())
  }
  next()
})

app.use('/', router)


app.listen(PORT, ()=>{
  console.log(`listening on port ${PORT}`)
})
