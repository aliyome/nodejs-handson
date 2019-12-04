const request = require('request');

request('https://example.com', (err, res, body) => {
  console.log(res.statusCode);
});
