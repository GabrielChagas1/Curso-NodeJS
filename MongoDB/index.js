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

//Model Usuários
const UserSchema = mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    sobrenome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    }, 
    idade: {
        type: Number,
        require: true
    },
    pais: {
        type: String
    }
});

//vincular esse model a um Schema
mongoose.model('usuarios', UserSchema);

const User = mongoose.model('usuarios');

new User({
    nome: 'Gabriel',
    sobrenome: 'Chagas', 
    email: 'teste@teste.com',
    idade: 20,
    pais: 'Brasil'
}).save().then(() =>{
    console.log('Inserido com sucesso!');
}).catch((err) =>{
    console.log(`Erro ao inserir, erro: ${err}`);
});