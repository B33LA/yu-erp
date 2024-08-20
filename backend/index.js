const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const dotenv = require('dotenv');
const cors = require('cors');

// Import routes
const apiRoutes = require('./routes/api');

// Load environment variables
dotenv.config();

const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing (useful for connecting frontend and backend)
app.use(bodyParser.json()); // Parse incoming requests with JSON payloads

// Use routes
app.use('/api', apiRoutes); // All API routes will be prefixed with /api

// Sync with the database and start the server
sequelize.sync()
  .then(() => {
    app.listen(5001, () => {
      console.log('Server is running on http://localhost:5001');
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
