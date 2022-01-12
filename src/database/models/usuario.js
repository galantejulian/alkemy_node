module.exports=function(sequelize,dataTypes){
    let usuario=sequelize.define('usuario',{

        id:{
            type:dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },

        nombre:{
            type:dataTypes.STRING(50)
        },

        email:{
            type:dataTypes.STRING(100)
        },

        password:{
            type:dataTypes.STRING(100)
        }

    },{
        freezeTableName: true,
        timestamps: false,
        tableName:'usuario',
    });

    
     
    return usuario;

}