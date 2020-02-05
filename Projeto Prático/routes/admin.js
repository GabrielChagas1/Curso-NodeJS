const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Categoria');
const Categoria = mongoose.model('categorias');

// rota inicial
router.get('/', (req, res) =>{
    res.render('admin/index');
});

// rota para visualizar os posts
router.get('/posts', (req, res) =>{
    // res.render('admin/categorias');
});

// rota para visualizar as categorias
router.get('/categorias', (req, res) =>{
    res.render('admin/categorias');
});

// rota para cadastrar uma categoria
router.get('/categorias/add', (req, res) =>{
    res.render('admin/addCategoria');
});

// post para cadastrar um post novo
router.post('/categoria/add', (req, res) =>{
    // criando "objeto"
    const newCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }
    new Categoria(newCategoria).save().then(() =>{
        console.log('Categoria salva com sucesso!');
    }).catch((err) => {
        console.log(`Erro ao salvar categoria: ${err}`);
    });
});



module.exports = router;