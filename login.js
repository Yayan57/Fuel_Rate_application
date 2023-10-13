const bcrypt = require('bcrypt')
const express = require('express')
const app = express()

app.use(express.json())

//users replace w database
const users = [];

app.get('/users', (request, response) => {
  response.json(users);
})

app.post('/register', async (request, response) => {
  try{
    const hashedpw = await bcrypt.hash(request.body.password, 10)
    const user = { name: request.body.name, password: hashedpw }
    
    users.push(user)
    
    response.status(201).send('User registration success')
  }
  catch{
    response.status(500).send('Registration error')
  }
})

app.post('/login', async (request, response) => {
  const user = users.find(user => user.name = request.body.name)
  if(user == null){
    return response.status(400).send('Username not found')
  }
  try{
    const isMatch = await bcrypt.compare(request.body.password, user.password)
    if(isMatch){
      response.send('Login successful')
    }
    else{
      response.send('Login failed')
    }
  }
  catch{
    response.status(500).send()
  }
})

