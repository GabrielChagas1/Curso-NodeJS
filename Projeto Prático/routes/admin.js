const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
require('../models/Categoria');
require('../models/Postagem');
const Categoria = mongoose.model('categorias');
const Postagem = mongoose.model('postagens');

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
    Postagem.find().populate('categoria').sort({data:'desc'}).then((postagens) =>{
        res.render('admin/postagens', {postagens : postagens});

    }).catch((req, res) => {
        req.flash('error_msg', 'Houve um erro ao listar as postagens');
        res.redirect('/admin/postagens');
    });
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

// biblioteca multer para upload de imagens
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/img/postagens');
    },
    filename: function(req, file, cb){
        cb(null, Date.now()+'-'+ file.originalname);
    }
});

const upload = multer({storage});

// route para add no banco
router.post('/postagens/add', upload.single('file'), (req, res) =>{
    if(req.body.categoria == '0'){
        erros.push({texto: 'Categoria inválida, registrar outra categoria'});
    }
    var erros = [];

    if(erros.length > 0){
        res.render('admin/addPostagem', {erros: erros});
    }else{
        const newPostagem = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria,
            slug: req.body.slug, 
            img: req.file.path.replace('public', '')
        }

        new Postagem(newPostagem).save().then(() =>{
            req.flash('success_msg', 'Postagem criado com sucesso');
            res.redirect('/admin/postagens');
        }).catch((err) =>{
            req.flash('error_msg', 'Houve um erro durante o cadastro da postagem.');
            res.redirect('/admin/postagens');
        });
    }
});

// route para chamar a página de editar postagem
router.get('/postagens/edit/:id', (req, res) =>{
    Postagem.findOne({_id: req.params.id}).then((postagem) =>{
        Categoria.find().then((categorias) =>{
            res.render('admin/editPostagem', {categorias: categorias, postagem: postagem});
        }).catch(function(){
            req.flash('error_msg', 'Houve ao trazer as categorias.');
            res.redirect('/admin/postagens');
        });
    }).catch(function(){
        req.flash('error_msg', 'Houve ao trazer a postagem.');
        res.redirect('/admin/postagens');
    });
});
// route para editar uma categoria
router.post('/postagem/edit', upload.single('file'), (req, res) =>{
    let img = '';

    if(!req.file){
        img = req.body.fileCurrent;
    }else{
        img = req.file.path.replace('public', '');
    }
    
    if(req.body.categoria == '0'){
        erros.push({texto: 'Categoria inválida, registrar outra categoria'});
    }
    var erros = [];

    if(erros.length > 0){
        res.render('admin/addPostagem', {erros: erros});
    }else{
        Postagem.findOne({_id: req.body.id}).then((postagem) =>{
            postagem.titulo =  req.body.titulo,
            postagem.descricao = req.body.descricao,
            postagem.conteudo = req.body.conteudo,
            postagem.categoria = req.body.categoria,
            postagem.slug = req.body.slug, 
            postagem.img = img

            postagem.save().then(() =>{
                req.flash('success_msg', 'Postagem editada com sucesso!');
                res.redirect('/admin/postagens');
            }).catch((err) =>{
                req.flash('error_msg', 'Houve um erro durante a edição da postagem.' + err);
                res.redirect('/admin/postagens');
            });

        }).catch((err) =>{
            req.flash('error_msg', 'Houve um erro durante a edição da postagem.' + err);
            res.redirect('/admin/postagens');
        });
    }
});

// route para deletar postagens
router.get('/postagem/delete/:id', (req, res) =>{
    Postagem.deleteOne({_id: req.params.id}).then(() =>{
        req.flash('success_msg', 'Postagem deletada com sucesso!');
        res.redirect('/admin/postagens');
    }).catch((err) =>{
        req.flash('error_msg', 'Houve um erro interno');
        res.redirect('/admin/postagens')
    })
});

module.exports = router;