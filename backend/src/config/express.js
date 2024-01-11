const express = require('express');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
const taskRoutes = require('../routes/taskRoutes');
const authRoutes = require('../routes/authRoutes'); // Optional for authentication
const analyticsRoutes = require('../routes/analyticsRoutes');

app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes); // Optional for authentication
app.use('/analytics', analyticsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
const PORT = process.env.PORT || 3000;


module.exports=app;