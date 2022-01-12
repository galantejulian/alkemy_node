const { validationResult } = require('express-validator');
const bcryptjs = require('bcrypt')
const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const peliculasAPIController = {
    listado: (req, res) => {
    db.pelicula.findAll({
        attributes: ['titulo', 'imagen', 'fecha_creacion']
    }).then(peliculas=>{
        res.status(200).json({
            total: peliculas.length,
            message: "lista de personajes",
            url: 'api/peliculas',
            data: personajes
        })
    }).cath(errores=>console.log(errores))
    },
    detalle: function(req, res){
    let id = req.params;
    db.pelicula.findByPk(id, {
              include: { 
                model: personaje,
                as: "personaje", 
                attribute: ["nombre"] 
            },
            })
            .then(function(pelicula){res.status(200).json({
                total: pelicula.length,
                message: "pelicula elegida por id",
                url: 'peliculas/id',
                data: pelicula
            })
            })
          },
crear: (req, res)=>{
        db.pelicula.create({
        imagen: req.body.imagen,
        titulo: req.body.titulo,
        fecha_creacion:req.body.fecha_creacion,
        calificacion:req.body.calificacion,
        genero: [{
nombre_genero: req.body.nombre_genero,
calificacion: req.body.calificacion,
        }]
    },{
         include: ['genero']
            })
            .then(function(pelicula){
                res.status(200).json({
                message: "pelicula creada correctamente",
                url: 'api/peliculas/create',
                data: pelicula
                })

            })
    },
editar: function(req, res){
    db.pelicula.update({
        imagen: req.body.imagen,
        titulo: req.body.titulo,
        fecha_creacion: req.body.fecha_creacion,
        calificacion: req.body.calificacion,
        id_genero: req.body.id_genero
    }, {
        where: {
            id_pelicula: req.params.id
        }    
    })
    .then(function(peliculaEditada){
        res.status(200).json({
            msg:'personaje editado',
            url: "api/peliculas/edit",
            data: peliculaEditada

    })
      }).catch(error=>console.log(error))

},
eliminar: function(req, res){
db.pelicula.destroy({
    where: {
        id: req.params.id
    }
})
},
buscar: function (req, res){
    const { name, genre, order} = req.query;
    
    if (query.name){
    pelicula = db.pelicula.findAll({
        where: {
            nombre: {
                [Op.like]: `%${query.name}%`
            }
        }
    })    
    }
    if(query.genre){
    pelicula= db.pelicula.findAll({
        where: {
            id_genero: query.genre
        },
        include: {
        attributes: ['nombre_genero'],
        model: genero,
        where: {
        id_genero: genero.id_genero
}
        }
    })
    }if(query.order){
    pelicula=db.personaje.findAll({
        order : [
            ['ASC']
        ]
        })
    }
    res.status(200).json(pelicula)
    }
    
}

module.exports = peliculasAPIController;