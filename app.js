var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var clientes = require('./routes/clientes');
var productos = require('./routes/productos');
var configuracion = require('./routes/configuracion');
var ventas = require('./routes/ventas');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/clientes', clientes);
app.use('/productos', productos);
app.use('/configuracion', configuracion);
app.use('/ventas', ventas);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
