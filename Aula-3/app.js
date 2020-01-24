var http = require('http');

http.createServer(function(req, res){
    res.end('ola mundo');
}).listen(8789);

console.log('Servidor rodando');