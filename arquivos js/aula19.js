const express = require('express');
const app = express();
const handlebars = require('express-handlebars');


//config
    //template Engine
        app.engine('handlebars', handlebars({defaultLayout = 'main'}));
        app.set('view engine', 'handlebars');
        app.listen(8087, function(){
            console.log('Servidor rodando na url http://localhost:8087');
        });
    //Conexão com banco de dados
        const Sequilize = require('sequelize');
        const sequelize = new Sequilize('test', 'root', '', {
            host: 'localhost',
            dialect: 'mysql'
        });