const { validationResult } = require('express-validator');
const bcryptjs = require('bcrypt')
const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken')


const UsuariosAPIController = {
register: function (req, res) {
let errores = validationResult(req);
if(!errores.isEmpty()){
    res.status(400).json({
    message: "los campos no fueron completados de forma correcta",
    url: 'api/users/create',
    })
    }else{
    let email = req.body.email;
    db.usuario.findOne({
        where: {
            email:email
        }
    })
.then(usuarioEncontrado=> {
    if(usuarioEncontrado != undefined){
res.status(400).json({
    message: "este usuario ya se encuentra registrado",
    url: "api/users/create"
})
    }else{
        db.usuario.create({
            nombre: req.body.nombre,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10)
        }).then(res.status(200).json({
            message: 'usuario creado con éxito',
            url: "api/users/create"
        }))
    }
})
}
},
login: function(req, res){
let email = req.body.email;
db.usuario.findOne({
where: {
    email : email
}
}).then(function(usuarioParaLogin){
    if(usuarioParaLogin==null){
        res.stauts(400).json({
            message:"ese email no esta registrado"
        })
    }else if (!bcryptjs.compareSync(req.body.password, usuarioParaLogin.password)){
        res.status(400).json({
            message: "las credenciales no coinciden"
        })
    }
    else {
        const token = jwt.sign({email}, 'secretkey', (err, token)=>{
res.json({
    token,
    message: "usuario ingresado con éxito"
})

        })
       
    }

    
}).catch(error=>console.log(error))

}
}


module.exports = UsuariosAPIController;