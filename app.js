const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect database
mongoose.connect(config.database);

// // Check db errors
let db = mongoose.connection;
// db.on('connected', () => { console.log('Connected to database: ' + config.database ); });
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to mongoDB');
});

const app = express();
const users = require('./routes/users');

// Needed to get values from req.body
// app.use(express.json());

// CORS middleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.json())

app.use('/users', users);

// Begin routing
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Port number
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on PORT ${port}...`));