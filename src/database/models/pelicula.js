module.exports = (sequelize, dataTypes) => {
    let alias = 'pelicula';
    let cols = {
        id_pelicula: {
            type: dataTypes.INTEGER(5).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        titulo: {
            type: dataTypes.STRING(30),
            allowNull: false
        },
        imagen_pelicula: {
            type: dataTypes.STRING(50)
        },
        fecha_creacion: {
            type: dataTypes.DATE,
        },
        calificacion: {
            type: dataTypes.INTEGER(11)
        },
        id_genero: dataTypes.INTEGER(11)
    };
    let config = {
        freezeTableName: true,
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const pelicula = sequelize.define(alias,cols,config);

    pelicula.associate = function (models) {
        pelicula.belongsTo(models.genero, { 
            as: "genero",
            foreignKey: "id_genero"
        })

        pelicula.belongsToMany(models.personaje, { 
            as: "personaje",
            through: 'personaje_pelicula',
            foreignKey: 'id_pelicula',
            otherKey: 'id_personaje',
            timestamps: false
        })
    }

    return pelicula
};