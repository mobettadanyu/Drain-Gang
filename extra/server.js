var fetch = require('node-fetch');
var http = require('http');
var fs = require('fs');

var full="";
var fileDescriptor = fs.openSync('boing.txt', 'a');
var tags = fs.openSync('tags.txt', 'a');
var searchterm="&text=abandoned&page=";
var apikey="8c04a05a67eb4a72c44f0c7ef3cfee5c";
var url="https://cors-evader.glitch.me/fetch/https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key="+apikey+"&extras=geo,url_o,tags,owner_name,date_taken,date_upload&format=json&has_geo=true&per_page=500&accuracy=16"+searchterm;
//var stop=8690;
var box=[-126.035156,23.563987,-65.214844,49.152970];
//-89.771215,40.297866,-85.529514,43.462397 box
//-91.703106,36.962265,-87.149205,42.524666 illinois as a whole bbox
//-126.035156,23.563987,-65.214844,49.152970 continental USA
function norm(text){
  return text.split('"').join("'");
}
function mid(num1,num2){
   return (num1+num2)/2;
}
function get(bbox,count){
 var fullurl=url+count+"&bbox="+bbox;
 // console.log(fullurl);
fetch(fullurl)
    .then(res => res.text())
    .then(text => save(text,bbox,count))
  .catch(error => {
      console.log("Boing! Error! Retrying!");
setTimeout(function(){get(bbox,count);},100);
  });
}
//https://live.staticflickr.com/65535/52528901512_f2d0be7c8d.jpg
//https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=50f96205200a27c81ab6d862e6b6fe6f&extras=geo&format=json&has_geo=true&per_page=500&accuracy=16&text=abandoned&page=1&bbox=-126.035156,23.563987,-65.214844,49.152970
//"https://live.staticflickr.com/"+element.server+"/"+element.id+"_"+element.secret+".jpg"
//console.log("<style>body{color:#black;} span.q{color:#FF0084;} span.ns{color:#0259C4; font-weight:bold;} span.n{color:#666666;} span.at{font-weight:bold;}</style><pre>jsonFlickrApi(".length)
function save(stuff,bbox,count){
//  var data=JSON.parse(stuff.slice(168,-7)); for services/api/render? 
  var data=JSON.parse(stuff.slice(14,-1));
  var stop=data.photos.total;
  console.log(stop+" results found...");
  if(stop>2999){
    var gox=bbox.split(',');
    gox.forEach(function(element,index){
      gox[index]=Number(element);
    });
    //+","+
    //west, south, east, north
setTimeout(function(){get(mid(gox[0],gox[2])+","+mid(gox[1],gox[3])+","+gox[2]+","+gox[3],count);},50);
setTimeout(function(){get(gox[0]+","+mid(gox[1],gox[3])+","+mid(gox[0],gox[2])+","+gox[3],count);},50);
setTimeout(function(){get(gox[0]+","+gox[1]+","+mid(gox[0],gox[2])+","+mid(gox[1],gox[3]),count);},50);
setTimeout(function(){get(mid(gox[0],gox[2])+","+gox[1]+","+gox[2]+","+mid(gox[1],gox[3]),count);},50);
  }else if(stop!=0){
    fs.readFile('boing.txt', 'utf8', (err, data) => {
  full=data;
});
  data.photos.photo.forEach(function(element,index){
 var string='["'+norm(element.title)+'","'+element.latitude+'","'+element.longitude+'","'+norm(element.ownername)+'","'+element.id+'","'+element.owner+'","'+element.secret+'","'+element.server+'","'+"https://live.staticflickr.com/"+element.server+"/"+element.id+"_"+element.secret+".jpg"+'","'+element.datetaken+'","'+element.dateupload+'"],';
    if(!full.includes(string)){
    fs.appendFileSync(tags,'['+element.tags+'],');
    fs.appendFileSync(fileDescriptor,string);
      console.log('New, Keep running')
    }
    });
  var workingcount=count+1;
 // console.log(((workingcount/stop)*100).toFixed(2));
 console.log("page..."+workingcount)
    if(workingcount!=stop+1){
setTimeout(function(){get(bbox,workingcount);},100);
  }else{
    console.log('one done');
  }
}
}

console.log(!fs.readFileSync('boing.txt', 'utf8'));
if(!fs.readFileSync('boing.txt', 'utf8')){
// get(box[0]+","+box[1]+","+box[2]+","+box[3],1);
console.log('empty');
} else {console.log('clear the fucken download file')}

//north east usa
//setTimeout(function(){get(mid(box[0],box[2])+","+mid(box[1],box[3])+","+box[2]+","+box[3],1);},100);// dont run

//splitting of northeast:
//setTimeout(function(){get('-80.419922,42.75572425,-65.214844,49.15297',1);},100);done
//setTimeout(function(){get('-95.625,42.75572425,-80.419922,49.15297',1);},100); done - 

var one=[-95.625,36.358478500000004,-80.419922,42.75572425];
var two=[-80.419922,36.358478500000004,-65.214844,42.75572425];
//setTimeout(function(){get(one[0]+","+one[1]+","+mid(one[0],one[2])+","+one[3],1);},100);done
//setTimeout(function(){get(mid(one[0],one[2])+","+one[1]+","+one[2]+","+one[3],1);},100);done


var oob=(two[0]+","+two[1]+","+mid(two[0],two[2])+","+two[3]).split(',');
oob.forEach(function(element,index){
oob[index]=Number(element);
});

//setTimeout(function(){get(oob[0]+","+oob[1]+","+mid(oob[0],oob[2])+","+oob[3],1);},100); done
//setTimeout(function(){get(mid(oob[0],oob[2])+","+oob[1]+","+oob[2]+","+oob[3],1);},100);done check


//setTimeout(function(){get(mid(two[0],two[2])+","+two[1]+","+two[2]+","+two[3],1);},100);done




//3/4 of usa done
//setTimeout(function(){get(box[0]+","+mid(box[1],box[3])+","+mid(box[0],box[2])+","+box[3],1);},100);
//setTimeout(function(){get(box[0]+","+box[1]+","+mid(box[0],box[2])+","+mid(box[1],box[3]),1);},100);
//setTimeout(function(){get(mid(box[0],box[2])+","+box[1]+","+box[2]+","+mid(box[1],box[3]),1);},100);

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(__dirname +'/boing.txt')
});

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})