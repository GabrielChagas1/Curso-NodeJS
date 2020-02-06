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
    Categoria.find().lean().then((categorias) => {
        console.log(categorias);
        res.render('admin/categorias', {categorias : categorias});
    }).catch((err) =>{
        req.flash('error_msg', 'Houve um erro ao listar as categorias');
        req.redirect('/admin');
    });
});

// rota para cadastrar uma categoria
router.get('/categorias/add', (req, res) =>{
    res.render('admin/addCategoria');
});

// post para cadastrar um post novo
router.post('/categoria/add', (req, res) =>{

    var err = [];
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        err.push({texto: 'Nome Inválido!'});
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        err.push({texto: 'Slug Inválido!'});
    }

    if(err.length > 0){
        res.render('admin/addCategoria', {erros: err});
    }else{
        // criando "objeto"
        const newCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }
        new Categoria(newCategoria).save().then(() =>{
            req.flash('success_msg', 'Categoria cadastrada com sucesso');
            res.redirect('/admin/categorias');
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro ao salvar a categoria');
            res.redirect('/admin');
        });
    }
});



module.exports = router;