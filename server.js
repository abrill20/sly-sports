const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const users = require('./routes/users');
const articles = require('./routes/articles');
const admin = require('./routes/admin');

const config = require('./config/database');

const app = express();

//Port Number
const httpPort = process.env.PORT || 8080

// Connect to database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(httpPort, function () {
    var port = server.address().httpPort;
    console.log("App now running on port", port);
  });
});

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database');
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));


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