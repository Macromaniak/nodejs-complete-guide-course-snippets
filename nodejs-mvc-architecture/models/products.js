const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

const filePath = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = cb => {
    fs.readFile(filePath, (error, content) => {
        if(!error)
            return cb(JSON.parse(content));
        else
        {
            console.log(error);
            return cb([]);
        }
    });
}

module.exports = class product {
    constructor(t) {
        this.title = t;
    }

    save() {

        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(filePath, JSON.stringify(products), (error) => {
                console.log(error);
            });
        })

    }

    static fetchAll(cb) {
        return getProductsFromFile(cb);
    }
}