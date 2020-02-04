const mongoose = require('mongoose');

//configurações
mongoose.Promise = global.Promise;

//conexão ao banco de dados
mongoose.connect('mongodb://localhost/teste', {
    useMongoClient: true
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch((err) =>{
    console.log(`Houve um erro ao conectar no mongoDB: ${err}`);
});