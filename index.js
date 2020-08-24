const https = require('https');
const fs = require('fs');

const token = process.env.ECWID_PUBTOKEN;
const storeId = process.env.ECWID_STOREID;
const reqString = `https://app.ecwid.com/api/v3/${storeId}/products?category=0&token=${token}`

console.log(  reqString )

let res = https.get(reqString, (res) => {
  console.log( Object.keys(res) );

  res.setEncoding('utf8');
  let rawData = '';

  res.on('data', (d) => { rawData += d; });
  res.on('end', () => {
    let parsed = JSON.parse(rawData);
    parsed.items.forEach(x => {
      delete x.url
      fs.writeFileSync(`./content/products/${String(x.name).toLowerCase()}.html`, `${JSON.stringify(x, undefined, ' ')}
    `)
    });
  })
});
