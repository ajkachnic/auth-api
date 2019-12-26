const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//Import Routes
const authRoute = require('./routes/auth.js');
// Set Port
const port = 3000;

dotenv.config();

// Connect To DB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log("Connected")
});

// Middleware
app.use(express.json());

// Route Middleware
app.use('/api/user', authRoute);

app.listen(port, () => console.log(`Running on Port: ${port}`));