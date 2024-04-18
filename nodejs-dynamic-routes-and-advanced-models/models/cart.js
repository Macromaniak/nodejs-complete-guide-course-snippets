const fs = require('fs');
const path = require('path');

const rootDir = require('../util/path');

const cartFilePath = path.join(rootDir, 'data', 'cart.json');

getCartItemsFromFile = (cb) => {
    fs.readFile(cartFilePath, (err, content) => {
        if(!err && content)
        cb(JSON.parse(content));
        else
        cb({});
    });
}

module.exports = class Cart {

    static addProduct = (pId, pPrice, cb) => {
        fs.readFile(cartFilePath, (error, content) => {
            let cart = {products: [], totalPrice: 0};
            console.log('content', content);
            if(!error) {
                cart = JSON.parse(content);
            }
           
            if(cart.products.some(item => item.id === pId)) {
                const itemIndex = cart.products.findIndex(item => item.id === pId);
                const existingItem = cart.products[itemIndex];
                let updatedItem;
                if(existingItem)
                {
                    updatedItem = {...existingItem};
                    updatedItem.qty++;
                    cart.products[itemIndex] = updatedItem;
                }
            }
            else {
                const newProduct = {id:pId, qty: 1};
                cart.products.push(newProduct);
            }
            cart.totalPrice+= +pPrice
        
            fs.writeFile(cartFilePath, JSON.stringify(cart), (err) => {
                console.log(err);
            })
            cb();
        })
         
    }

    static getCart = cb => {
        getCartItemsFromFile(cb);
    }

    static deleteProduct = (pId, prodPrice, cb) => {
        getCartItemsFromFile(cartItems => {
            if(cartItems.products && cartItems.products.length > 0)
            {
                const deletedProduct = cartItems.products.filter(item => item.id === pId);
                if(!deletedProduct)
                    cb();
                let deletedProductTotalPrice = 0;
                if(deletedProduct) {
                    deletedProductTotalPrice = prodPrice * deletedProduct.qty;
                }
                const updatedProductList = cartItems.products.filter(item => item.id !== pId);
                const updatedCartTotal = cartItems.totalPrice-= deletedProductTotalPrice;
                const updatedCart = {products: updatedProductList, totalPrice: updatedCartTotal};

                fs.writeFile(cartFilePath, JSON.stringify(updatedCart), err => {
                    console.log(err);
                    cb(err);
                })

            }
            else
                cb();
            
        });
    }
}