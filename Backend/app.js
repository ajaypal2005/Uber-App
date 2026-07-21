const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express(); 
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db'); // Import the database connection function
const userRoutes = require('./routes/user.routes'); // Import the user routes
const captainRoutes = require('./routes/captian.routes'); // Import the captain routes


connectToDb();


app.use(cors({origin: true,credentials: true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});



// Use the defined routes
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/user', userRoutes);

module.exports = app;