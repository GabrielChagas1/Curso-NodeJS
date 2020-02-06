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

    // Flahs
    app.use(flash());

    // Middleware
    app.use((req, res, next) =>{
        // Mensagens de sucesso e falhas
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        next();
    });



// Rotas
app.use('/admin', admin);


// Configurando Servidor
const port = 8007;
app.listen(port, () =>{
    console.log('Servidor Ativo na porta 8007');
});