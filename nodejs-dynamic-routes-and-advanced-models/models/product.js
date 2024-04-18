const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const rootDir = require('../util/path');

const productsFilePath = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = cb => {
  fs.readFile(productsFilePath, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, price, description) {
    this.id = Math.random().toString();
    this.title = title,
    this.imageUrl = imageUrl,
    this.description = description,
    this.price = price
  }

  save(edit = -1) {
    
    getProductsFromFile(products => {
      let newProductArray = [...products];
      
      if(edit !== -1)
      {
        console.log('the id ', edit);
        this.id = edit;
        const existingItemIndex = products.findIndex(item => item.id === edit);
        console.log(existingItemIndex);
        if(newProductArray[existingItemIndex])
        newProductArray[existingItemIndex] = this;
        else
        console.log('failed to retrieve product to update');
      }
      else
        newProductArray.push(this);
      
      fs.writeFile(productsFilePath, JSON.stringify(newProductArray), err => {
        console.log('errors..',err);
      });
    });
    
  }

  static deleteProduct = (prodId, cb) => {
    getProductsFromFile(products => {
      const productToDelete = products.filter(item => item.id === prodId);
      const updatedProducts = products.filter(item => item.id !== prodId);
      fs.writeFile(productsFilePath, JSON.stringify(updatedProducts), err => {
        console.log('errors..',err);
        Cart.deleteProduct(prodId, productToDelete.price, err => {
          cb(err);
        })
      })
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

static getProductDetailsById = (pId, cb) => {
  getProductsFromFile(products => {
    let product = products.find(prod => prod.id === pId)
    cb(product)
  })
}
};
