const express = require('express')
const app = express()
const port = 3000;

app.use(express.static('public'))

var urlencodedParser = bodyParser.urlencoded({ extended: true })

const orders = [];

app.get('/', function (req, res) {
    res.sendFile("./Fuel_Quote_Form.html");
  })

app.listen(port, function() {  
    console.log('Server running on port 3000');  
}); 

app.post('/orders', urlencodedParser, function (req, res) {
    var gallons = req.body.gallons_requested;
    var address = req.body.delivery_address;
    var date = req.body.delivery_date;
    var ppg = req.body.price_per_gallon;
    var total = req.body.total_amount;
    if (!gallons || !address || !date || !ppg || !total) {
      res.status(400).json({ message: 'Incomplete order request' });
    } else {
      const newOrder = {
        id: orders.length + 1,
        gallons,
        address,
        date,
        ppg,
        total,
      };
      orders.push(newOrder);
      res.status(201).json(newOrder);
    }
  });