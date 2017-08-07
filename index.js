// call the packages we need
let express = require('express'),
    app = express(),
    Crypto = require('./src/server/db'),
    path = require('path'),
    port = process.env.PORT || 8080,
    router = express.Router(),
    CONFIG = require('./config');

//(accessed at GET http://localhost:8080/api)
router.get('/api', function(req, res) {
    if(CONFIG.ENV=='DEV'){
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
    }

    Crypto.find({}, function (err, docs) {
      // docs is an array
      if (err) return handleError(err);
      res.json(docs);
    });
});

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

// all of our routes will be prefixed with /api
app.use('/', router);
app.use(express.static(path.join(__dirname, '/dist')))


// START THE SERVER
app.listen(port);
console.log('Server running on port ' + port);
