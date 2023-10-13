const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());


const clients = [];

// Get all clients
app.get('/clients', (req, res) => {
  res.json(clients);
});

// Get a single client by ID
app.get('/clients/:id', (req, res) => {
  const clientId = parseInt(req.params.id);
  const client = clients.find((c) => c.id === clientId);
  if (client) {
    res.json(client);
  } else {
    res.status(404).json({ message: 'Client not found' });
  }
});

// Create a new client
app.post('/clients', (req, res) => {
  const { name, email, address } = req.body;
  if (!name || !email || !address) {
    res.status(400).json({ message: 'Incomplete client data' });
  } else {
    const newClient = {
      id: clients.length + 1,
      name,
      email,
      address,
    };
    clients.push(newClient);
    res.status(201).json(newClient);
  }
});

// Update a client's information
app.put('/clients/:id', (req, res) => {
  const clientId = parseInt(req.params.id);
  const client = clients.find((c) => c.id === clientId);
  if (!client) {
    res.status(404).json({ message: 'Client not found' });
  } else {
    const { name, email, address } = req.body;
    if (!name || !email || !address) {
      res.status(400).json({ message: 'Incomplete client data' });
    } else {
      client.name = name;
      client.email = email;
      client.address = address;
      res.json(client);
    }
  }
});

// Delete a client by ID
app.delete('/clients/:id', (req, res) => {
  const clientId = parseInt(req.params.id);
  const index = clients.findIndex((c) => c.id === clientId);
  if (index !== -1) {
    clients.splice(index, 1);
    res.json({ message: 'Client deleted' });
  } else {
    res.status(404).json({ message: 'Client not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
