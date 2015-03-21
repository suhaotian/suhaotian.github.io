var fs = require('fs');


var fileName = process.argv[2];
var fileData = fs.readFileSync('./pfzl.mp3','binary');
var base64Data = new Buffer(fileData).toString('base64');

fs.writeFileSync(fileName + '.base64', base64Data);
console.log(fileName);