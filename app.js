var express = require('express');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', function (req, res, next) {
  console.log('GET in /');
  res.json({ message: 'API' });
});

module.exports = app;