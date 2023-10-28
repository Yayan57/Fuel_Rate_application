const express = require('express')
const app = express()
const port = 3000;

app.use(express.static('public'))
var urlencodedParser = bodyParser.urlencoded({ extended: true })

var mysql = require('mysql');
var db = mysql.createConnection({
  host: 'cosc4353project.mysql.database.azure.com', // Replace with host name
  user: 'cosc4353admin',      // Replace with database username
  password: 'FuelQuoteProject4353',      // Replace with database password
  database: '' // // Replace with database Name
}); 
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = db;

const orders = [];

app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next();
})

app.get('/', function (req, res) {
    res.sendFile("./Fuel_Quote_Form.html");
  })

app.listen(port, function() {  
    console.log('Server running on port 3000');  
}); 

app.post('/orders', urlencodedParser, function (req, res) {
    var userid = req.user.username
    var gallons = req.body.gallons_requested;
    var address = req.body.delivery_address;
    var date = req.body.delivery_date;
    var ppg = req.body.price_per_gallon;
    var total = req.body.total_amount;
    if (!username || !gallons || !address || !date || !ppg || !total) {
      res.status(400).json({ message: 'Incomplete order request' });
    } else {
        db.query('INSERT INTO FuelQuote (userID, gallonsRequested, deliveryAddress, deliveryDate, ppg, totalPrice) VALUES (?, ?, ?, ?, ?, ?)', [userid, gallons, address, date, ppg, total], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
    }
      //orders.push(newOrder);
      res.status(201).json(newOrder);
    }
  });
