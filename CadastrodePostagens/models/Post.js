const db = require('./db');

const Post = db.sequelize.define('postagens', {
    titulo:{
        type: db.Sequilize.STRING
    },
    conteudo: {
        type: db.Sequilize.TEXT
    }
});

module.exports = Post;

// Post.sync({force: true});