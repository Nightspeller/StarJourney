var express = require('express');
var app = express();
var favicon = require('serve-favicon');

app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.use(express.static('public', {
    extensions: ['html']
}));

app.listen(3004, function () {
    console.log('StarJourney is listening on port 3004')
});