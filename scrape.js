var request = require('request-promise');
var fs = require('fs');
var cheerio = require('cheerio');
var url = 'http://substack.net/images/';
var json2csv = require('json2csv');
var fields = ['filePermission', 'absoluteUrl', 'fileType'];

// File Permission
// Absolute URL
// File Type


request(url)
  .then(function(data){
    var $ = cheerio.load(data);
    return $('tr').map(parseTR).get();
  })
  .then(function(val) {
    json2csv({ data: val, fields: fields }, function(err, csv) {
    if (err) console.log(err);

    fs.writeFile('images.csv', csv, function(err) {
      if (err) throw err;
      console.log('file saved');
    });
  });
});
  

function parseTR(i, tr) {
  //find all  tds
  var $ = cheerio.load(tr);

  // File Permission
  var filePermission = $('td').children().eq(0).text();

  // // Absolute URL
  var absolute = $('td').children().eq(2).text();

  var x =  { 

    filePermission: filePermission, 
    absoluteUrl: url + absolute,
    fileType: absolute.split('.')[1]


  };

  // console.log(x);
  return x;

}


