// Carregando módulos
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const moment = require('moment');
require('./models/Postagem');
require('./models/Categoria');
const Postagem = mongoose.model('postagens');
const Categoria = mongoose.model('categorias');

// Routes 
const admin = require('./routes/admin');

// Configurações
    // Body Parser
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    // Handlebars
    app.engine('handlebars', handlebars({
        defaultLayout: 'main',
        helpers: {
            formatDate: (date) => {
                return moment(date).format('DD/MM/YYYY');
            }
        }
    }));
    app.set('view engine', 'handlebars');

    // Mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/blogapp').then(() =>{
        console.log('Conectado ao mongoDB');
    }).catch((err) =>{
        console.log(`Erro ao se conectar ${err}`);
    });

    // Public 
    app.use(express.static(path.join(__dirname, 'public')));

    // Sessão
    app.use(session({
        secret: 'cursodenode', 
        resave: true,
        saveUninitialized: true
    }));

    // Flash
    app.use(flash());

    // Middleware
    app.use((req, res, next) =>{
        // Mensagens de sucesso e falhas
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        next();
    });

// Routes
app.get('/', (req, res) =>{
    Postagem.find().populate('categoria').sort({data: 'desc'}).then((postagens) =>{
        res.render('index', {postagens: postagens});
    }).catch((err) =>{
        res.flash('error_msg', 'Erro ao trazer as postagens');
        res.redirect('/404');
    })
});

app.get('/404', (req, res) =>{
    res.send('erro 404');
});



// Rotas
app.use('/admin', admin);

// postagem
app.get('/postagem/:slug', (req, res) =>{
    Postagem.findOne({slug: req.params.slug}).then((postagem) =>{
        if(postagem){
            res.render('postagem/index', {postagem: postagem});
        }else{
            req.flash('error_msg', 'Está postagem não existe');
            res.redirect('/');
        }
    }).catch((err) =>{
        req.flash('error_msg', 'Houve um erro interno');
        res.redirect('/');
    });
});

// listar todas as categorias
app.get('/categorias', (req, res) =>{
    Categoria.find().then((categorias) =>{
        res.render('categorias/index', {categorias: categorias});
    }).catch((err) =>{
        req.flash('error_msg', 'Houve um erro interno');
        res.redirect('/');
    });
});

// listar todas as postagens por uma categoria
app.get('/categorias/:slug', (req, res) =>{
    Categoria.findOne({slug: req.params.slug}).then((categoria) =>{
        if(categoria){
            Postagem.findOne({categoria: categoria._id}).then((postagens) =>{
                res.render('categorias/postagens', {categoria: categoria, postagens: postagens});
            }).catch((err) =>{
                req.flash('error_msg', 'Houve um erro ao listar os posts');
                res.redirect('/');
            });
        }else{
            req.flash('error_msg', 'Está categoria não existe');
            res.redirect('/categorias');
        }
    }).catch((err) =>{
        req.flash('error_msg', 'Houve um erro interno');
        res.redirect('/');
    })
})


// Configurando Servidor
const port = 8007;
app.listen(port, () =>{
    console.log('Servidor Ativo na porta 8007');
});