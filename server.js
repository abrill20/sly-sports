const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

const users = require('./routes/users');
const articles = require('./routes/articles');
const admin = require('./routes/admin');
const logger = require('./logging/logs');

const config = require('./config/database');

// Connect to database
mongoose.connect(process.env.MONGODB_URI || config.database, {
  // useMongoClient: true
  useNewUrlParser: true
});

// On Connection
mongoose.connection.on('connected', () => {
  logger.info('Connected to database');
});

// On Error
mongoose.connection.on('error', (err) => {
  logger.info('Database error: '+err);
});

const app = express();

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

//Port Number
const httpPort = process.env.PORT || 8000

// Cors Middleware
app.use(cors());

app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//Routers
const router = express.Router();
app.use('/api', router);
app.use('/api/users', users);
app.use('/api/articles', articles);
app.use('/api/admin', admin);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'))
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'))
})

// For contact forms
app.post('/incoming_mail', (req, res) => {
  logger.info(`${req.method} articles${req.url} ${req.httpVersion}`);
  logger.info(`User is ${req.body.user}`);
  res.send(req.body.user);
})


app.listen(httpPort, () => {
  logger.info(`HTTP server up on port ${httpPort}`)
})

module.exports.app = app;