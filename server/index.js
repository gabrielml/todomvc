var express = require('express');
var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.static('client'));
app.listen(PORT, function() {
    console.log('application running on port ' + PORT);
});