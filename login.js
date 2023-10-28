const bcrypt = require('bcrypt')
const express = require('express')
const app = express()
const mysql = require("mysql")

app.use(express.json())

const conn = mysql.createConnection({
  host: 'your_mysql_host',
  user: 'your_username',
  password: 'your_password',
  database: fuel_rate_application
});

conn.connect(function(err) {
   if (err) {
      console.log(err);
   }
   else {
      console.log("Connection established");
   }
});


app.get('/users', (request, response) => {
  response.json(users);
})


app.post('/register', async (request, response) => {
  try{
    const hashedpw = await bcrypt.hash(request.body.password, 10);
    const user = { id: request.body.name, password: hashedpw };
    
    conn.query("INSERT INTO UserCredentials SET ?", user, function(err, result){
      if(err){
        console.log(err);
      }
      else{
        console.log("Inserted " + result.affectedRows + " row");
      }
    });
    
    response.status(201).send('User registration success')
  }
  catch{
    response.status(500).send('Registration error')
  }
})


app.post('/login', async (request, response) => {
  const username = request.body.name;

  conn.query("SELECT * FROM UserCredentials WHERE id = ?", [username], function(err, result){
    if(err){
      console.log(err);
    }
    else{
      if(result.length > 0){
        const user = result[0];
        if(bcrypt.compareSync(request.body.password, user.password)){
          response.status(200).send('Login Successful');
        }
        else{
          response.status(401).send('Login Failed');
        }
      }
      else{
        response.status(401).send('Login Failed');
      }
    }
  });
});

app.listen(3000);
