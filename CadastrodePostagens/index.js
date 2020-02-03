const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/Post');

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

app.get('/', function(req, res){
    res.render('home');
})

app.post('/add', function(req, res){
    //criando um registro na tabela postagens
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function(){
        // res.send("Post criado com sucesso!");
        res.redirect('/');
    }).catch(function(err){
        res.send(`Houve um erro: ${err}`);
    });
});

app.listen(8087, function(){
    console.log('Servidor rodando na url http://localhost:8087');
});