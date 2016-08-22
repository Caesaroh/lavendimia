
module.exports = function(sequelize, DataTypes) {
    var Configuracion = sequelize.define('configuracion', {
        tasa: {type: DataTypes.FLOAT, defaultValue: 0},
        enganche: {type: DataTypes.FLOAT, defaultValue: 0},
        plazoMaximo: {type: DataTypes.FLOAT, defaultValue: 0}
    });

    return Configuracion;
};