const express = require("express");
const app = express();

app.get('/', function(req, res){
    res.send("Seja bem-vindo ao meu app");
});

app.get('/sobre', function(req, res){
    res.send("Página Sobre");
});

app.get('/blog', function(req, res){
    res.send("Bem-vindo ao meu blog");
})

app.listen(8087, function(req, res){
    console.log('Servidor Rodando na URL http://localhost:8087');
});