var Sequelize = require('sequelize');
var sequelize = new Sequelize('test', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(function(){
    console.log('Conectado com sucesso');
}).catch(function(erro){
    console.log(`Falha ao se conectar ${erro}`) ;
});