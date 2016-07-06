var express = require('express');

var PORT = process.env.PORT || 3000;

express()
    .use(express.static('client'))
    .listen(PORT, function() {
    console.log('application running on port ' + PORT);
});