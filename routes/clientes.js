var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  models.cliente.findAll({attributes: {exclude: ['createdAt', 'updatedAt']}}).then(function (clientes) {
    res.json(clientes);
  });
});

router.get('/getCliente/:id', function(req, res, next) {
  models.cliente.findById(req.params.id, {attributes: {exclude: ['createdAt', 'updatedAt']}}).then(function (cliente) {
    res.json(cliente);
  });
});

router.get('/nextClave', function(req, res, next) {
  models.cliente.findOne({
    attributes: [
      [models.sequelize.fn('max', models.sequelize.col('id')), 'lastId']
    ]
  }).then(function (response) {
    res.json(response);
  });
});

router.post('/guardar', function(req, res, next) {
  var cliente = req.body;

  if (cliente.id) {
    models.cliente.update(cliente, {where: {id: cliente.id}}).then(function () {
      res.json({success: true});
    });
  } else {
    models.cliente.create(cliente).then(function () {
      res.json({success: true});
    });
  }
});

module.exports = router;
