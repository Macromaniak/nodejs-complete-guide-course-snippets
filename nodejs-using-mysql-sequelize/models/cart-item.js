const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const CartItem = sequelize.define('CartItem', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    qty: {
        type: Sequelize.INTEGER,
        allowNull:false
    }
})

module.exports = CartItem;