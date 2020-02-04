// Carregando módulos
const express = require('express');
const app = express();
const hadlebars = require('express-handlebars');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');

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

// Configurando Servidor
const port = 8007;
app.listen(port, () =>{
    console.log('Servidor Ativo');
});