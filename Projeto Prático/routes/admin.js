const express = require('express');
const router = express.Router();

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



module.exports = router;