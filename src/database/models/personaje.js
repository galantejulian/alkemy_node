module.exports = (sequelize, dataTypes) => {
    let alias = 'personaje';
    let cols = {
        id_personaje: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
    imagen: {
        type: dataTypes.STRING(100)
    },
        nombre: {
            type: dataTypes.STRING(50)
        },
        edad:{
            type: dataTypes.INTEGER(11)
        },
        peso: {
            type: dataTypes.INTEGER(11),
        },
        historia: dataTypes.STRING(100)
    };
    let config = {
        freezeTableName: true,
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const personaje = sequelize.define(alias, cols, config); 

    personaje.associate = function (models) {
        personaje.belongsToMany(models.pelicula, { // models.Movie -> Movies es el valor de alias en movie.js
            as: "pelicula",
            through: 'personaje_pelicula',
            foreignKey: 'id_personaje',
            otherKey: 'id_pelicula',
            timestamps: false,

        })
    }

    return personaje
};