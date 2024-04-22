const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const rootDir = require('../util/path');

const db = require('../util/db');

const productsFilePath = path.join(rootDir, 'data', 'products.json');

module.exports = class Product {
  constructor(title, imageUrl, price, description) {
    this.id = Math.random().toString();
    this.title = title,
    this.imageUrl = imageUrl,
    this.description = description,
    this.price = price
  }

  save(edit = -1) {

    if(edit === -1) {
      return db.execute('INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)', [this.title, this.price, this.description, this.imageUrl]);
    }
    else {
      return db.execute('UPDATE products SET title = ?, price = ?, imageUrl = ?, description = ? WHERE id = ?', [this.title, this.price, this.imageUrl, this.description, edit]);
    }

  }

  static deleteProduct = prodId => {
    return db.execute('DELETE FROM products where id = ?', [prodId]);
  }

  static fetchAll(cb) {
    // getProductsFromFile(cb);
    return db.execute('SELECT * FROM products');
  }

static getProductDetailsById = (pId) => {
  return db.execute('SELECT * FROM products WHERE id = ?', [pId]);
}
};
