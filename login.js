const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const mysql = require("mysql");
const session = require('express-session');
const crypto = require('crypto');

const secret = crypto.randomBytes(32).toString('hex');

app.use(session({
  secret: secret,
  resave: true,
  saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const conn = mysql.createConnection({
  host:"cosc4353project.mysql.database.azure.com", 
  user:"cosc4353admin", 
  password:"FuelQuoteProject4353", 
  database:"fuel_rate_application", 
  port:3306, 
  ssl:{ca:fs.readFileSync("{ca-cert filename}")}
});

conn.connect(function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log("Connection established");
  }
});

app.post('/Client_Registration', async (request, response) => {
  try{
    const hashedpw = await bcrypt.hash(request.body.password, 10);
    const user = { id: request.body.username, password: hashedpw };
    
    conn.query("INSERT INTO UserCredentials SET ?", user, function(err, result){
      if(err){
        if(err.code === 'ER_DUP_ENTRY'){
          response.status(409).send('Username Already Exists');
        }
        else{
          console.log(err);
          response.status(500).send('Registration error');
        }
      }
      else{
        console.log("Inserted " + result.affectedRows + " row");
        response.status(201).send('User registration success');
      }
    });
  }
  catch{
    response.status(500).send('Registration error');
  }
});

app.post('/login', async (request, response) => {
  const username = request.body.username;
  const password = request.body.password;

if(username && password){
  conn.query("SELECT * FROM UserCredentials WHERE id = ?" , [username], function(err, result){
    if(err){
      console.log(err);
      response.status(500).send('Login error');
    }
    else{
      if(result.length > 0){
        const user = result[0];
        const match = bcrypt.compareSync(password, user.password);
        
        if(match){
          request.session.loggedin = true;
          request.session.username = username;
          response.redirect('/Fuel_Quote_Form');
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
}
else{
  response.status(401).send('Login Failed');
}
});

function requireLogin(request, response, next) {
  if(request.session.loggedin){
    next();
  }else
  {
    response.redirect('/login');
  }
}

app.get('/Fuel_Quote_Form', requireLogin, (request, response) => {
  response.render('Fuel_Quote_Form', { username: request.session.username });
});

app.get('/logout', (request, response) => {
  request.session.destroy((err) => {
    if(err){
      console.error(err);
    }
    response.redirect('/login');
  });
});

app.listen(3000);
