const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getAllProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};

exports.getProductDetails = (req, res, next) => {
  const pID = req.params.pID.toString();
  Product.getProductDetailsById(pID, product => {
    res.render('shop/product-detail', {
      product: product,
      path: '/products',
      pageTitle: product.title
    })
  })
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for(product of products) {
        let cartProductData = cart.products.find(item => item.id === product.id);
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
    
  })
}

exports.deleteCartItem = (req,res,next) => {
  const id = req.body.prodId;
  const price = req.body.prodPrice;

  Cart.deleteProduct(id, price, err => {
    if(err)
    console.log('delete from cart failed');
    res.redirect('/cart');
  })

}

exports.postCart = (req, res, next) => {
  const pId = req.body.prodId;
  const pPrice = req.body.pPrice;
    Cart.addProduct(pId, pPrice, () => {
      res.redirect('/cart');
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