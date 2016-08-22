var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  models.producto.findAll({attributes: {exclude: ['createdAt', 'updatedAt']}}).then(function (productos) {
    res.json(productos);
  });
});

router.get('/getProducto/:id', function(req, res, next) {
  models.producto.findById(req.params.id, {attributes: {exclude: ['createdAt', 'updatedAt']}}).then(function (producto) {
    res.json(producto);
  });
});

router.get('/nextClave', function(req, res, next) {
  models.producto.findOne({
    attributes: [
      [models.sequelize.fn('max', models.sequelize.col('id')), 'lastId']
    ]
  }).then(function (response) {
    res.json(response);
  });
});

router.post('/guardar', function(req, res, next) {
  var producto = req.body;

  if (producto.id) {
    models.producto.update(producto, {where: {id: producto.id}}).then(function () {
      res.json({success: true});
    });
  } else {
    models.producto.create(producto).then(function () {
      res.json({success: true});
    });
  }
});

module.exports = router;