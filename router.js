const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
  const {time} = req.cookies
  res.render('index', {time})
})

router.get('/users/:id', (req, res)=>{
  const {id} = req.params
  const {query, cookies, headers} = req
  res.render('users', {id, query, cookies, headers})
})

router.get('/form', (req, res)=>{
  res.render('form')
})

router.post('/form', (req, res)=>{
  req.checkBody('username', 'Username is required').notEmpty()
  req.checkBody('password', 'Password is required').notEmpty()
  req.checkBody('gender', 'Gender is required').notEmpty()
  req.getValidationResult().then(function(result) {
    const data = req.body
    const err = result.array()
    if(err.length > 0){
      res.render('form', {err, data})
    }else{ 
      res.render('result', {data})
    }  
  })
 
})

// api endpoints

router.get('/api/time', (req, res)=>{
  res.json({time: new Date()})
})
const users = []
router.post('/api/users', (req, res)=>{
  users.push(req.body)
  res.send("Done")
})


router.get('/api/users', (req, res)=>{
  res.json(users)
})

module.exports = router
