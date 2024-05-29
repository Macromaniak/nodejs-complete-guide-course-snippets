const Sequelize = require('sequelize');

const sequelize = new Sequelize('learn-node', 'root', '#1122phases', {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;