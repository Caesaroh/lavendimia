var models = require('../models');
var express = require('express');
var router = express.Router();

models.venta.belongsTo(models.cliente, {foreignKey: 'clienteId'});

router.get('/', function(req, res) {
  models.venta.findAll({
    attributes: {exclude: ['createdAt', 'updatedAt']},
    include: [{
      model: models.cliente,
      attributes: {exclude: ['createdAt', 'updatedAt', 'rfc']}
    }]
  }).then(function (ventas) {
    res.json(ventas);
  });
});

router.get('/nextClave', function(req, res) {
  models.venta.findOne({
    attributes: [
      [models.sequelize.fn('max', models.sequelize.col('id')), 'lastId']
    ]
  }).then(function (response) {
    res.json(response);
  });
});

router.post('/guardar', function(req, res) {
  var venta = {
    clienteId: req.body.cliente.id,
    total: req.body.total,
    fecha: new Date().toJSON().slice(0,10)
  };

  models.venta.create(venta).then(function () {
    res.json({success: true});
  });
});

module.exports = router;
