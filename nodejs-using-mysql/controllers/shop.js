const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getAllProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows, fieldData]) => {
    // console.log(rows);
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products',
      hasProducts: rows.length > 0,
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
  Product.getProductDetailsById(pID)
  .then(([product]) => {
    res.render('shop/product-detail', {
      product: product[0],
      path: '/products',
      pageTitle: product[0].title
    })
  })
  .catch(err => console.log(err));
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows, fieldData]) => {
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: rows.length > 0,
      activeShop: true,
      productCSS: true
    });
  })
  .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  Cart.getCart()
  .then(([cartItems]) => {
    Product.fetchAll()
    .then(([products]) => {
      const cartProducts = [];
      for(product of products) {
        let cartProductData = cartItems.find(item => item.product_id === product.id);
        if(cartProductData)
        cartProducts.push({productData: product, qty: cartProductData.qty});
      }
      console.log('filteredcartdata ', cartProducts);
      res.render('shop/cart', {
        cart: cartProducts,
        path: '/cart',
        pageTitle: 'Your Cart'
      })
    })
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
}

exports.deleteCartItem = (req,res,next) => {
  const id = req.body.prodId;
  const price = req.body.prodPrice;

  Cart.deleteProduct(id, price, err => {
    if(!err)
      res.redirect('/cart');
    else
      console.log('delete from cart failed');
  })

}

exports.postCart = (req, res, next) => {
  const pId = req.body.prodId;
  const pPrice = req.body.pPrice;
    Cart.addProduct(pId, pPrice, err => {
      if(!err) {
        res.redirect('/cart');
      } else {
      console.log(err);
      }
    })
    
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  })
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  })
}