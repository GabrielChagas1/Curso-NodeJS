const Sequilize = require('sequelize');
const sequelize = new Sequilize('postapp', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {
    Sequilize: Sequilize,
    sequelize: sequelize
}