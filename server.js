const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const users = require('./routes/users');
const articles = require('./routes/articles');
const admin = require('./routes/admin');

const config = require('./config/database');

// Connect to database
mongoose.connect(process.env.MONGODB_URI || config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database');
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const app = express();

//Port Number
const httpPort = process.env.PORT || 8080

// Cors Middleware
app.use(cors());

app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//Routers
const router = express.Router();
app.use('/', router);
app.use('/users', users);
app.use('/articles', articles);
app.use('/admin', admin);

app.listen(httpPort, () => {
  console.log(`HTTP server up on port ${httpPort}`)
})