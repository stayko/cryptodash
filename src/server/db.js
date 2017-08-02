var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//connect to MongoDB
mongoose.connect('mongodb://localhost/cryptodash',  { useMongoClient: true });

//model schema
var Schema = mongoose.Schema;
var cryptoSchema = new Schema({
  date: { type: Date, default: Date.now },
  data: Array
});

var Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;
