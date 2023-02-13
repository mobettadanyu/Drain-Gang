var fs = require('fs');
var data="";
fs.readFile('tags.txt', 'utf8', (err, baba) => {
  data=baba;
var final=data.slice(0, -1);
final = final.replace(/\\/g, "\\\\");
fs.appendFileSync('goop.txt', 'var all=['+final+'];');
});