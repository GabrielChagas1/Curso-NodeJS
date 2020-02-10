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
        // console.log(categorias);
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

// post para cadastrar uma categoria nova
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

//route para recuperar uma categoria
//params para parametros e não form
router.get('/categorias/edit/:id', (req, res) =>{
    Categoria.findOne({_id: req.params.id}).then((categoria) =>{
        res.render('admin/editCategoria', {categoria: categoria});
    }).catch((err) =>{
        req.flash('error_msg', 'Esta categoria não existe');
        res.redirect('/admin/categorias');
    });
});

// route para editar uma categoria
router.post('/categoria/edit', (req, res) =>{

    var err = [];
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        err.push({texto: 'Nome Inválido!'});
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        err.push({texto: 'Slug Inválido!'});
    }

    if(err.length > 0){
        Categoria.findOne({_id: req.body.id}).then((categoria) =>{
            res.render('admin/editCategoria', {categoria: categoria, erros: err});
        }).catch((err) =>{
            req.flash('error_msg', 'Esta categoria não existe');
            res.redirect('/admin/categorias');
        });

        // res.render('admin/editCategoria',);
    }else{
        Categoria.findOne({_id: req.body.id}).then((categoria) =>{
            categoria.nome = req.body.nome;
            categoria.slug = req.body.slug;
    
            categoria.save().then(() =>{
                req.flash('success_msg', 'Categoria editada com sucesso!');
                res.redirect('/admin/categorias');
            }).catch((err) =>{
                req.flash('error_msg', 'Houve um erro ao salvar a categoria');
                res.redirect('/admin/categorias');
            });
    
        }).catch((err) =>{
            req.flash('error_msg', 'Houve um erro ao editar esta categoria');
            res.redirect('/admin/categorias');
        });
    }
});

// deletar categoria
router.post('/categorias/deletar', (req, res) => {
    Categoria.deleteOne({_id: req.body.id}).then(() =>{
        req.flash('success_msg', 'Categoria excluída com sucesso');
        res.redirect('/admin/categorias');
    }).catch((err) =>{
        req.flash('error_msg', 'Houve um erro ao excluir');
        res.redirect('admin/categorias');
    });
});

// Routes para postagens
router.get('/postagens', (req, res) =>{
    res.render('admin/postagens')
});

// route para redenrizar a página de edição de postagens
router.get('/postagens/add', (req, res) =>{
    var categorias = Categoria.find().lean().then((categorias) =>{
        res.render('admin/addPostagem', {categorias: categorias});
    }).catch((err) =>{
        req.flash('error_msg', 'Houve um erro ao trazer as categorias').
        res.redirect('admin/postagens');
    });
});


module.exports = router;