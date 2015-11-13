var express = require('express');

var app = express();

app.set('view engine', 'jade');

app.use(express.static('public'));

app.get('/', function(req, res){
  res.render('index', {
    title: "Fluffy Barnacle",
    subtitle: "Spotify export to MP3 download"
  });
});

console.log("[fluffy-barnacle] listening on port 3000.")
app.listen(3000);
