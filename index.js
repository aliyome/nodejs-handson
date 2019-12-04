// 演習2
// const request = require('request');

// request('https://example.com', (err, res, body) => {
//   console.log(res.statusCode);
// });

// 演習4

const fs = require('fs');
const rs = fs.createReadStream(__filename);

// rs.on('data', data => {
//   console.log(data.toString());
// });

// rs.on('error', err => {
//   console.error(err);
// });

const main = async () => {
  // for await
  try {
    for await (const data of rs) {
      console.log(data.toString());
    }
  } catch (e) {
    console.error(e);
  }
};

main().catch(console.error);
