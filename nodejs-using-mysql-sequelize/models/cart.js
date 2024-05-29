const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const Cart = sequelize.define('Cart', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
})

module.exports = Cart;