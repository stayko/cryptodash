let https = require('https'),
    CronJob = require('cron').CronJob,
    Crypto = require('./db');

console.log('Cron job started...');

new CronJob('1 * * * * *', function() {

  console.log('Fetching data...');

  let url = 'https://api.coinmarketcap.com/v1/ticker/?convert=GBP&limit=4';

  https.get(url, function(res){
      let body = '';

      res.on('data', function(chunk){
          body += chunk;
      });

      res.on('end', function(){
          try {

            Crypto.findOne({ }, 'data', function (err, result) {
              if (err) return handleError(err);

              let dataArrays = [];

              if(result){
                for(let i = 0; i<result.data.length; i++){
                  dataArrays.push(result.data[i].data);
                }

                console.log(dataArrays);
              }


              let jsonData = JSON.parse(body),
                  cryptoData = [];

              for(let i = 0; i < 4; i++){

                let time = Date.now();

                if(dataArrays[i]) dataArrays[i].push({x: time, y: parseFloat(jsonData[i].price_gbp)});

                cryptoData.push({
                    name: jsonData[i].name,
                    symbol: jsonData[i].symbol,
                    currentPrice: parseFloat(jsonData[i].price_gbp),
                    currentMarketCap: parseFloat(jsonData[i].market_cap_gbp),
                    currentTotalSupply: parseFloat(jsonData[i].total_supply),
                    data: dataArrays[i] ? dataArrays[i] : [{x: time, y : parseFloat(jsonData[i].price_gbp)}]
                  });
              }

              let query = {},
                  update = { data: cryptoData, date: new Date },
                  options = { upsert: true, new: true, setDefaultsOnInsert: true };

              // Find the document
              Crypto.findOneAndUpdate(query, update, options, function(error, result) {
                  if (error) return;
              });


            })

            console.log('Data added to database!');
          } catch (e) {
            console.log(e);
          }
      });
  }).on('error', function(e){
        console.log("Error: ", e);
  });


}, null, true, 'Europe/London');
