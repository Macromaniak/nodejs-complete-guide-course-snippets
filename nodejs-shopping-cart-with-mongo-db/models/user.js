const mongodb = require('mongodb');
const getDb = require('../util/db').getDb;
const mongoObjectId = mongodb.ObjectId;

class User {
    constructor(username,email, cart, id) {
        this.username = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this)
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        })

    }

    addToCart(product) {
        const cartProduct = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString();
        });
        // const cartProduct = -1;
        let updatedCart;
        let updatedQty = 1;
        let cartItems = this.cart ? this.cart.items : [];
        if(cartProduct >= 0) {
            updatedQty = this.cart.items[cartProduct].qty + 1;
            cartItems[cartProduct].qty = updatedQty;
            updatedCart = {items: cartItems};
        }
        else {
            if(this.cart)
            updatedCart = {items: [...this.cart.items,{productId: new mongoObjectId(product._id), qty: updatedQty}]};
            else
            updatedCart = {items: [{productId: new mongoObjectId(product._id), qty: updatedQty}]};
        }
        const db = getDb();
            return db.collection('users').updateOne({_id: new mongoObjectId(this._id)}, {$set: {cart: updatedCart}})
            .then(result => {
                console.log('updated cart!');
                return result;
            })
            .catch(err => {
                console.log(err);
            });
    }

    getCart() {
        const db = getDb();
        const cartProductIds = this.cart.items.map(i => {
            return i.productId;
        })
        return db.collection('products').find({_id: {$in: cartProductIds}})
        .toArray()
        .then(products => {
            return products.map(p => {
                return {...p, qty: this.cart.items.find(ci => {
                    return ci.productId.toString() === p._id.toString()
                }).qty}
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    deleteFromCart(prodId) {
        const db = getDb();
        let cartItems = this.cart.items;
        const updatedCart = cartItems.filter(item => item.productId.toString() !== prodId.toString());

        return db.collection('users').updateOne({_id: new mongoObjectId(this._id)}, {$set: {cart:{items: updatedCart}}})
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });

    }

    createOrder() {
        const db = getDb();
        let orderData = {};
        return this.getCart()
        .then(products => {
            orderData = {
                items: products,
                userId: new mongoObjectId(this._id)
            }
            return db.collection('orders').insertOne(orderData);
        })
        .then(result => {
            console.log('order created!: ', result);
            this.cart.items = [];
            db.collection('users').updateOne({_id: this._id}, {$set: {cart: {items: []}}})
            .then(result => {
                console.log('cart emptied!', result);
                // return result
            })
            .catch(err => {
                console.log('cart empty failed!: ', err);
            })
            // return result;
        })
        .catch(err => {
            console.log('create order error!: ', err);
        })
    }

    getOrders() {
        const db = getDb();
        return db.collection('orders').find({userId: new mongoObjectId(this._id)})
        .toArray()
        .then(orders => {
            return orders;
        })
        .catch(err => {
            console.log('fetch orders error! ', err);
        })
    }

    static findUserById(userId) {
        const db = getDb();
        return db.collection('users').find({_id: new mongoObjectId(userId)})
        .next()
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        })
    }
}

module.exports = User;