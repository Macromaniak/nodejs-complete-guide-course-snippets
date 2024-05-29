const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }, 
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Product;