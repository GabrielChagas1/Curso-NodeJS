const Sequilize = require('sequelize');
const sequelize = new Sequilize('test', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const Postagem = sequelize.define('Postagens', {
    id: {
        type: Sequilize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo:{
        //informar que o tipo é um varchar
        type:  Sequilize.STRING
    },

    conteudo:{
        //informar que o campo tem o tipo text
        type: Sequilize.TEXT
    }

});

Postagem.create({
    titulo: 'ola mundo',
    conteudo: 'aprendendo a criar modelos com nodeJS'
});

const Usuario = sequelize.define('Usuarios', {
    nome:{
        type: Sequilize.STRING
    },

    sobrenome:{
        type: Sequilize.STRING
    },

    idade:{
        type: Sequilize.INTEGER
    },

    email:{
        type: Sequilize.STRING
    }
});

// Usuario.sync({force: true});

//sincronizando com o mysql
// Postagem.sync({force: true});