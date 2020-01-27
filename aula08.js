var express = require('express');
var app = express();

app.get('/ola/:nome', function(req, res){
    res.send(`<h1>Olá ${req.params['nome']}</h1>`);
    // res.send(req.params);
});


app.listen(8087, function(){
    console.log('Servidor Ativo!');
});