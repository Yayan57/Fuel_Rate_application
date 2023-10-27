const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Create a MySQL connection pool
const db = mysql.createPool({
  host: 'your_mysql_host',
  user: 'your_username',
  password: 'your_password',
  database: 'client_profiles',
  connectionLimit: 10, // Adjust based on your needs
});

// Define validation function for client data
const validateClientData = (data) => {
  const { name, email, address } = data;
  return name && email && address;
};

// Get all clients
app.get('/clients', (req, res) => {
  db.query('SELECT * FROM clients', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(results);
  });
});

// Get a single client by ID
app.get('/clients/:id', (req, res) => {
  const clientId = parseInt(req.params.id);
  db.query('SELECT * FROM clients WHERE id = ?', [clientId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json(results[0]);
  });
});

// Create a new client
app.post('/clients', (req, res) => {
  const { name, email, address } = req.body;
  if (!validateClientData(req.body)) {
    return res.status(400).json({ message: 'Incomplete client data' });
  }

  db.query('INSERT INTO clients (name, email, address) VALUES (?, ?, ?)', [name, email, address], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    const newClientId = result.insertId;
    res.status(201).json({ id: newClientId, name, email, address });
  });
});

// Update a client's information
app.put('/clients/:id', (req, res) => {
  const clientId = parseInt(req.params.id);
  if (!validateClientData(req.body)) {
    return res.status(400).json({ message: 'Incomplete client data' });
  }

  db.query('UPDATE clients SET name = ?, email = ?, address = ? WHERE id = ?', [req.body.name, req.body.email, req.body.address, clientId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json({ id: clientId, ...req.body });
  });
});

// Delete a client by ID
app.delete('/clients/:id', (req, res) => {
  const clientId = parseInt(req.params.id);
  db.query('DELETE FROM clients WHERE id = ?', [clientId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json({ message: 'Client deleted' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// For unit tests
module.exports = app;
