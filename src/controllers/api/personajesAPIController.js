const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const personaje = require('../../database/models/personaje');

const personajesAPIController = {
listado: (req, res) => {
db.personaje.findAll({
    attributes: ['nombre', 'imagen']
}).then(personajes=>{
    res.status(200).json({
        total: personajes.length,
        message: "lista de personajes",
        url: 'api/characters',
        data: personajes
    })
})
},
crear: function (req, res) {
    db.personaje.create({
        imagen: req.body.imagen,
        nombre: req.body.nombre,
        edad: req.body.edad,
        peso: req.body.peso,
        historia: req.body.historia,
        pelicula: [{
            titulo: req.body.titulo, 
            imagen_pelicula: "hola",
            fecha_creacion: req.body.fecha_creacion,
            calificacion: req.body.calificacion
        }]
    },{
        include: 'pelicula'
    })
        .then(function (nuevoPersonaje) {
            res.status(200).json({
                total:nuevoPersonaje.length,
                message: "personaje creado con éxito",
                url: 'characters/create',
                data: nuevoPersonaje
            })
        }).catch(function (error) {
            console.log(error)
        })
    
},
editar: function (req, res) {
    db.personaje.update({
        imagen: req.body.imagen,
        nombre: req.body.nombre,
        edad: req.body.edad,
        peso: req.body.peso,
        historia: req.body.historia,
        pelicula: [{
            titulo: req.body.titulo,
            imagen_pelicula: req.body.imagen_pelicula,
            fecha_creacion: req.body.fecha_creacion,
            calificacion: req.body.calificacion
        }]
    }, {
        where: {
            id_personaje: req.params.id
        }    
    })
    res.json({
        msg:'character edited'
      })

},
// me falto agregar el delete cascade en el modelo
borrar: function(req, res){
        db.personaje_pelicula.destroy({
          where: {
              id_personaje: req.params.id
          }
      })
      .then(function() {
          db.personaje.destroy({
              where: {
                  id_personaje:req.params.id
              }
      }).then(function(){
res.status(200).json({
message: "personaje eliminado con éxito",
url: "characters/delete/:id"
          })
      }) 
      })
      .catch(error => console.log(error));    
    
    
},
detalle: function(req, res){
    db.personaje.findByPk(req.params.id, {
        include: [{
            association: "pelicula",
            attributes: ['id_pelicula', 'titulo'],
        }]
    })
    .then(function(detallePersonaje){
        if(detallePersonaje){
            res.status(200).json({
                message: "detalle encontrado",
                url: "/api/detail",
                data: detallePersonaje
            })
        }else{
            res.status(400).json({
                message: "personaje no encontrado"
            })
        }
    })
    .catch(error=>console.log(error))
},
buscar: function (req, res) {
    const { name, age, movies } = req.query;

    if (name) {
      const personaje = db.personaje.findAll({
          where: {
              nombre: {
                  [Op.like]: "%"+name+"%"}
            }
    })
  
}
if (age){
    db.personaje.findAll({
        where: {
            edad: {
                [Op.like]: "%"+edad+"%"
            }
        }
    })
}

if (movies) {
db.personaje.findAll({
    include: ['pelicula'],
    where: {
        id_pelicula: movies
    }
})
}
if (!personaje.length){
    res.status(404).json({
        message: "error, personaje no encotrada"
    })
}else{
res.status(200).json({
    message:'personaje encontrado',
    data: personaje
})
}
}
}

module.exports = personajesAPIController;