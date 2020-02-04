// Carregando módulos
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');

const admin = require('./routes/admin');

// Configurações
    // Body Parser
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    // Handlebars
    app.engine('handlebars', handlebars({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

    // Mongoose
    // EM BREVE

// Rotas
app.use('/admin', admin);


// Configurando Servidor
const port = 8007;
app.listen(port, () =>{
    console.log('Servidor Ativo');
});