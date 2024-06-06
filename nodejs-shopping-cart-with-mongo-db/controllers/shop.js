// const Cart = require('../models/cart');
const Product = require('../models/product');
const User = require('../models/user');
// const Order = require('../models/order');

exports.getAllProducts = (req, res, next) => {
  Product.fetchAll()
  .then(products => {
    // console.log(rows);
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  })
  .catch(err => {
    console.log(err);
  })
  
};

exports.getProductDetails = (req, res, next) => {
  const pID = req.params.pID.toString();
  Product.fetchSingleById(pID)
  .then(product => {
    res.render('shop/product-detail', {
      product: product,
      path: '/products',
      pageTitle: product.title
    })
  })
  .catch(err => console.log(err));
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  })
  .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
  .then(cart => {
    console.log(cart);
    
    res.render('shop/cart', {
      cart: cart,
      path: '/cart',
      pageTitle: 'Your Cart'
    })
    
  })
  .catch(err => console.log(err));
}

exports.deleteCartItem = (req,res,next) => {
  const prodId = req.body.prodId;
  
  req.user.deleteFromCart(prodId)
  .then(() => {
    res.redirect('/cart');
  })
  .catch(err => console.log(err));

}

exports.postCart = (req, res, next) => {
  const pId = req.body.prodId;
  Product.fetchSingleById(pId)
  .then(product => {
    return req.user.addToCart(product)
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    })
    .catch(err => {
      console.log(err);
    })
  })
  .catch(err => {
    console.log(err);
  });
  
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  })
}

exports.getOrders = (req, res, next) => {
  req.user.getOrders()
  .then(orders => {
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders
    })
  })
  .catch(err => {
    console.log(err);
  })
}

exports.postCreateOrder = (req, res, next) => {
  req.user.createOrder()
  .then(() => {
    // console.log('create order result: ', result);
    res.redirect('/orders');
  })
  .catch(err => console.log('create order error!: ',err))
}