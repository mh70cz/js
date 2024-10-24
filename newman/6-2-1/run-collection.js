const newman = require('newman');
const fs = require('fs');

newman.run({
  collection: require('./EST_Email_fraud_score.postman_collection.json'),
  reporters: 'cli' // writes to console (if deleted, silent output, just writes to file...)
})
.on('request', (err, args) => {
  if (err) return;

  const response = {
    itemName: args.item.name,
    url: args.request.url.toString(),
    method: args.request.method,
    responseCode: args.response.code,
    responseBody: args.response.stream.toString(),
  };

  // Append response to a file
  fs.appendFileSync('responses.log', JSON.stringify(response, null, 2) + ',\n');
})
.on('done', (err) => {
  if (err) {
    console.error('Collection run encountered an error:', err);
  } else {
    console.log('Collection run completed.');
  }
});
