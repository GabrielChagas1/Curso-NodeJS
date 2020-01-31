const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

//config
//template Engine
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');//Conexão com banco de dados

//Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Rotas
app.get('/cad', function(req, res){
    res.render('formulario');
});

app.post('/add', function(req, res){
    //form de cadastrar postagens
    res.send(`Título: ${req.body.titulo} e Texto: ${req.body.conteudo}`)
});

app.listen(8087, function(){
    console.log('Servidor rodando na url http://localhost:8087');
});