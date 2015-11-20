// Bring in external packages
var express = require('express');
var hbs = require('hbs');
var bodyParser = require('body-parser');
var Converter = require('csvtojson').Converter;
var google = require('googleapis');

// Instantiate CSV to JSON converter
var converter = new Converter({});

var app = express();

// Set up static file service
app.use(express.static('public'));

// Set view engine to use Handlebars
app.set('view engine', 'hbs');

// Enable body-parser with json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Listen for GET requests at the root path, '/'
app.get('/', function(req, res){
  res.render('index', {
    title: 'fluffy-barnacle'
  });
});

// Listen for POST requests at '/links'
app.post('/links', function(req, res){
  // Convert posted CSV to JSON
  converter.fromString(req.body.csvInput, function(err, result){
    if(err){
      console.error(err);
      // TODO -> Render page
    } else {
      // Sort JSON
      console.log(result);
      result.sort(function(a,b){
        if(a["Artist Name"] < b["Artist Name"]){
          return -1;
        } else if(a["Artist Name"] > b["Artist Name"]){
          return 1;
        } else {
          if(a["Track Name"] < b["Track Name"]){
            return -1;
          } else {
            return 1;
          }
        }
      });
      // Parse JSON to form an array of YouTube search strings
      var list = [];
      for(var i = 0; i < result.length; i++){
        list.push(result[i]["Track Name"] + ", " + result[i]["Album Name"] + ", " + result[i]["Artist Name"]);
      }
      res.render('linklist', {
        songs: list
      });
    }
  });
//  console.log(req.body.csvInput);
});

// http://YoutubeInMP3.com/fetch/?format=JSON&video=http://www.youtube.com/watch?v=

console.log('[fluffy] listenting on port 3000');
app.listen(3000);
