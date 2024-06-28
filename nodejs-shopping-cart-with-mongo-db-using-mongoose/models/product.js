const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('Product', ProductSchema);

// const mongodb = require('mongodb');
// const getDb = require('../util/db').getDb;

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb().collection('products');
//     let dbOp;
//     if(this._id) {
//       dbOp = db.updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: this});
//     }
//     else {
//       dbOp = db.insertOne(this)
//     }
//     return dbOp
//     .then(result => {
//       console.log(result)
//     })
//     .catch(err => {
//       console.log(err);
//     });
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db.collection('products').find().toArray()
//     .then(products => {
//       return products;
//     })
//     .catch(err => {
//       console.log(err);
//     })
//   }

//   static fetchSingleById(prodId) {
//     const db = getDb();
//     return db.collection('products').find({_id: new mongodb.ObjectId(prodId)})
//     .next()
//     .then(product => {
//       console.log('single product', product);
//       return product;
//     })
//     .catch(err => {
//       console.log(err);
//     })
//   }

//   static deleteSingleById(prodId) {
//     const db = getDb();
//     return db.collection('products').deleteOne({_id: new mongodb.ObjectId(prodId)})
//     .then(result => {
//       console.log('Deleted!');
//       return;
//     })
//     .catch(err => {
//       console.log(err);
//     })
//   }

// }

// module.exports = Product;