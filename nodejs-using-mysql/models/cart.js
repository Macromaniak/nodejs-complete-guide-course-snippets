const fs = require('fs');
const path = require('path');

const rootDir = require('../util/path');

const cartFilePath = path.join(rootDir, 'data', 'cart.json');

const db = require('../util/db');

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

        db.execute('SELECT * FROM cart where product_id = ?', [pId])
        .then(([items]) => {
            console.log('items......',items)
            if(items.length > 0) {
                const item_id = items[0].id;
                const qty = +items[0].qty + 1;
                console.log('updated qty ', qty);
                db.execute('UPDATE cart set qty = ? where id = ?', [qty, item_id])
                .then(([])=>{
                    cb();
                })
                .catch(err => cb(err));
            }
            else {
                db.execute('INSERT INTO cart (product_id, qty) VALUES(?, ?)', [pId, 1])
                .then(([])=>{
                    cb();
                })
                .catch(err => cb(err));
            }
        })
        .catch(err => {
            console.log(err);
            cb(err);
        });
                 
    }

    static getCart = cb => {
        // getCartItemsFromFile(cb);
        return db.execute('SELECT * FROM cart');
    }

    static deleteProduct = (pId, prodPrice, cb) => {

        db.execute('SELECT * FROM cart where product_id = ?', [pId])
        .then(([item]) => {
            item = item[0];
            if(item.qty === 1) {
                console.log('exist qty1');
                db.execute('DELETE FROM cart where id = ?', [item.id])
                .then(([])=>{
                    cb();
                })
                .catch(err => cb(err));
            }
            else {
                console.log('exist qty > 1');
                db.execute('UPDATE cart set qty = ? where id= ?', [item.qty-1, item.id])
                .then(([])=>{
                    cb();
                })
                .catch(err => cb(err));
            }
        })
        .catch(err => {
            console.log(err);
            cb(err);
        });
    }
}