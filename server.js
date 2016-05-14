var express = require('express');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/:id', function (req, res) {
  setTimeout(function(){
    res.json(req.params.id);    
  }, 3000);  
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});