module.exports=function(sequelize,dataTypes){
    const alias='personaje_pelicula';

    const cols={
        id:{
            type:dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true, 
        },
        id_personaje:{
            type:dataTypes.INTEGER(5)
        },
        id_pelicula:{
            type:dataTypes.INTEGER(5)
        }
    }
    
    const config={
        tableName:'personaje_pelicula',
        timestamps:false,
        underscored: true,
    };

const personaje_pelicula=sequelize.define(alias,cols,config);
personaje_pelicula.associate = function (models){
    personaje_pelicula.belongsTo(models.personaje, {
        as:"personaje",
        foreignKey: "id_personaje",
    })
}
personaje_pelicula.associate = function(models){
    personaje_pelicula.belongsTo(models.pelicula,{
        as:"pelicula",
        foreignKey:"id_pelicula",
    })
}
    return personaje_pelicula;
}