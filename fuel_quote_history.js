const express = require('express')
const app = express()
const port = 3000;

app.use(express.static('public'))
var urlencodedParser = bodyParser.urlencoded({ extended: true })

var mysql = require('mysql');
var db = mysql.createConnection({
  host: 'cosc4353project.mysql.database.azure.com', 
  user: 'cosc4353admin',      
  password: 'FuelQuoteProject4353',      
  database: 'cosc4353project'
}); 
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = db;

app.get('/api/fuelQuotes', (req, res) => {
    const sql = 'SELECT * FROM FuelQuotes';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/fuelQuotes')
        .then(response => response.json())
        .then(data => populateTable(data))
        .catch(error => console.error('Error fetching data:', error));
});


// Function to populate the table with data
function populateTable() {
    const table = document.getElementById("fuelQuoteTable");

    fuelQuotes.forEach(quote => {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);

        cell1.innerHTML = quote.gallonsRequested;
        cell2.innerHTML = quote.deliveryAddress;
        cell3.innerHTML = quote.deliveryDate;
        cell4.innerHTML = `${quote.suggestedPrice.toFixed(2)}`;
    });
}

// Call the populateTable function to fill the table
populateTable();
