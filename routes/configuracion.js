var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  models.configuracion.findOne({attributes: {exclude: ['createdAt', 'updatedAt']}}).then(function (configuracion) {
    res.json(configuracion || {});
  });
});

router.post('/guardar', function(req, res) {
  var configuracion = req.body;

  if (configuracion.id) {
    models.configuracion.update(configuracion, {where: {id: configuracion.id}}).then(function () {
      res.json({success: true});
    });
  } else {
    models.configuracion.create(configuracion).then(function () {
      res.json({success: true});
    });
  }
});

module.exports = router;
