module.exports = (sequelize, dataTypes) => {
    let alias = 'genero';
    let cols = {
        id_genero: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
        },
    imagen: {
        type: dataTypes.STRING(50)
    },
        nombre_genero: {
            type: dataTypes.STRING(50)
        },
        calificacion:{
            type: dataTypes.INTEGER(11)
        }
    };
    let config = {
        freezeTableName: true,
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const genero = sequelize.define(alias, cols, config); 

    genero.associate = function (models) {
        genero.hasMany(models.pelicula, { // models.Movie -> Movies es el valor de alias en movie.js
            as: "pelicula",
           foreignKey: "id_genero"
        })
    }

    return genero
};