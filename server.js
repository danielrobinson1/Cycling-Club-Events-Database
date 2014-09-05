// Call the packages we need.

var express    = require('express');
var path       = require('path');
var bodyParser = require('body-parser');

// Define our app using express.
// Must be a global variable for our modules to work.

app            = express();

// Configure app to use bodyParser().
// This will let us get the data from a POST.

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup.

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Setup mongoose to connect to our temporary database
// Database is hosted on Mongolab.
// Username: admin, pw: admin.

var mongoose   = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds063929.mongolab.com:63929/wheelers_events');

// Set up routing.

var routes = require('./routes/index');
var events = require('./routes/events');
app.use('/', routes);
app.use('/events', events);

// Server.

port   = process.env.PORT || 8080;
app.listen(port);
console.log('Magic happens on port ' + port);