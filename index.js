// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var Crypto = require('./src/server/db');
var path = require('path');

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/api', function(req, res) {
    Crypto.find({}, function (err, docs) {
      // docs is an array
      if (err) return handleError(err);
      res.json(docs);
    });
});

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);
app.use(express.static(path.join(__dirname, '/dist')))


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server running on port ' + port);
