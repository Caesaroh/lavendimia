
module.exports = function(sequelize, DataTypes) {
    var Venta = sequelize.define('venta', {
        clienteId: {type: DataTypes.INTEGER},
        total: {type: DataTypes.FLOAT, defaultValue: 0},
        fecha: {type: DataTypes.DATE}
    });

    return Venta;
};