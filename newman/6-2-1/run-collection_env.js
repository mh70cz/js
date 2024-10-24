const newman = require('newman');
const fs = require('fs');


const environment = {
  "id": "3c35d952-f64a-4935-bbd6-97876ea73aca",
  "values": [
    {
      "key": "Username",
      "value": "210257/test",
      "type": "text",
      "enabled": true
    },
    {
      "key": "Password",
      "value": "6dKm3Tin0K5J",
      "type": "text",
      "enabled": true
    },
    {
      "key": "Email",
      //"value": "mock.example@creditinfo.com",  // OK for given credentials
      "value": "user@seznam.cz", // not allowed for given credentials
      "type": "text",
      "enabled": true
    }
  ],
  "name": "environment",
  "_postman_variable_scope": "environment",
  "_postman_exported_at": "2024-10-23T15:39:55.948Z",
  "_postman_exported_using": "Newman/5.2.2"
}

newman.run({
  collection: require('./EST_Email_fraud_score.postman_collection.json'),
  reporters: 'cli', // writes to console (if deleted, silent output, just writes to file...)
  environment: environment // Pass the environment object
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
