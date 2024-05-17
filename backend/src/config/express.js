const express = require('express');
const bodyParser = require('body-parser');
const cors= require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
// Middleware
app.use(bodyParser.json());

// Routes
const taskRoutes = require('../routes/taskRoutes');
const authRoutes = require('../routes/authRoutes'); // Optional for authentication


app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes); // Optional for authentication


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
const PORT = process.env.PORT || 3000;


module.exports=app;