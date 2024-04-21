import express from "express";

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// GET request handler
app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

// POST request handler
app.post('/upload', (req, res) => {
  // Handle the uploaded data here
  console.log(req.body); // Assuming the uploaded data is in JSON format
  res.send('Data received successfully!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

