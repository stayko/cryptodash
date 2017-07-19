var http = require('http');
var CronJob = require('cron').CronJob;
var Crypto = require('./db');

console.log('Cron job started...');

new CronJob('1 * * * * *', function() {

  console.log('Fetching data...');

  var url = 'http://api.coinmarketcap.com/v1/ticker/?convert=GBP&limit=4';

  http.get(url, function(res){
      var body = '';

      res.on('data', function(chunk){
          body += chunk;
      });

      res.on('end', function(){
          try {
            var jsonData = JSON.parse(body);
            var cryptoModelArray = [];
            var cryptoData = [];
            for(var i = 0; i < 4; i++){
              cryptoData.push(
              {
                name: jsonData[i].name,
                symbol: jsonData[i].symbol,
                price: jsonData[i].price_gbp,
                marketCap: jsonData[i].market_cap_gbp,
                totalSupply: jsonData[i].total_supply
              });

            }
            cryptoModelArray.push({data: cryptoData });
            Crypto.insertMany(cryptoModelArray);
            console.log('Data added to database!');
          } catch (e) {
            console.log(e);
          }
      });
  }).on('error', function(e){
        console.log("Error: ", e);
  });


}, null, true, 'Europe/London');
