const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const moment = require('moment');
const Post = require('./models/Post');

//config
//template Engine
app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    helpers: {
        formatDate: (date) => {
            return moment(date).format('DD/MM/YYYY');
        }
    }
}));
app.set('view engine', 'handlebars');//Conexão com banco de dados

//Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Rotas
// Sequelize
app.get('/cad', function(req, res){
    res.render('formulario');
});

app.get('/', function(req, res){
        Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
        res.render('home', {posts: posts});
    }); 
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

app.get('/deletar/:id', function(req, res){
    Post.destroy({where:{'id': req.params.id}}).then(function(){
        res.send('Excluído com sucesso')
    }).catch(function(err){
        res.send('Está posatagem não existe');
    });
});

app.listen(8087, function(){
    console.log('Servidor rodando na url http://localhost:8087');
});