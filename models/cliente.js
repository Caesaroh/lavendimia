
module.exports = function(sequelize, DataTypes) {
    var Cliente = sequelize.define('cliente', {
        nombre: {type: DataTypes.STRING, defaultValue: ''},
        apellidoPaterno: {type: DataTypes.STRING, defaultValue: ''},
        apellidoMaterno: {type: DataTypes.STRING, defaultValue: ''},
        rfc: {type: DataTypes.STRING, defaultValue: ''}
    });

    return Cliente;
};