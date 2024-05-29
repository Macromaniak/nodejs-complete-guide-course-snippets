const Cart = require('../models/cart');
const Product = require('../models/product');
const Order = require('../models/order');

exports.getAllProducts = (req, res, next) => {
  Product.findAll()
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
  Product.findByPk(pID)
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
  Product.findAll()
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
    return cart.getProducts()
    .then(products =>{
      // console.log('the cart......', products[0].cartItem);
      res.render('shop/cart', {
        cart: products,
        path: '/cart',
        pageTitle: 'Your Cart'
      })
    })
    .catch(err => {
      console.log(err);
    })
  })
  .catch(err => console.log(err));
}

exports.deleteCartItem = (req,res,next) => {
  const prodId = req.body.prodId;
  console.log('prod id is.. ', prodId);
  const price = req.body.prodPrice;
  req.user.getCart()
  .then(cart => {
    console.log('cart items.. ', cart);
    return cart.getProducts({where: {id: prodId}});
  })
  .then(products => {
    console.log('asd ',products[0]);
    const product = products[0];
    return product.CartItem.destroy();
  })
  .then(result => {
    console.log(result);
    res.redirect('/cart');
  })
  .catch(err => console.log(err));

}

exports.postCart = (req, res, next) => {
  const pId = req.body.prodId;
  let fetchedCart;
  let newQty = 1;
  req.user.getCart()
  .then(cart => {
    fetchedCart = cart;
    return cart.getProducts({where: {id: pId}})
  })
  .then(products => {
    let product;
    if(products.length > 0){
      product = products[0];
    }
    
    if(product)
    {
      console.log('tttt ', product.CartItem.qty);
      newQty = product.CartItem.qty+1;
      return product;
    }
    return Product.findByPk(pId)
  })
  .then(product => {
    return fetchedCart.addProduct(product, {through: {qty: newQty}});
  })
  .then(response => {
    console.log('add to cart response ', response);
    res.redirect('/cart');
  })
  .catch(err => console.log(err));
  
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  })
}

exports.getOrders = (req, res, next) => {
  req.user.getOrders({include: ['products']})
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
  let fetchedCart;
  req.user.getCart()
  .then(cart => {
    fetchedCart = cart;
    return cart.getProducts()
  })
  .then(products => {
    return req.user.createOrder()
    .then(order => {
      order.addProducts(products.map(product => {
        product.OrderItem = {quantity: product.CartItem.qty};
        return product;
      })
      )
    })
    .catch(err => console.log(err))
  })
  .then(result => {
    return fetchedCart.setProducts(null);
  })
  .then(result => {
    res.redirect('/orders');
  })
  .catch(err => console.log(err))
}