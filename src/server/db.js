let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//connect to MongoDB
mongoose.connect('mongodb://localhost/cryptodash',  { useMongoClient: true });

//model schema
let Schema = mongoose.Schema;
let cryptoSchema = new Schema({
  date: { type: Date, default: Date.now },
  data: Array
});

let Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;
