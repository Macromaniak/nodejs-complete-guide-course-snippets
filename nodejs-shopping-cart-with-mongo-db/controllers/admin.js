const Product = require("../models/product");
// const { getAdminProducts } = require("./shop");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    edit: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  
  const product = new Product(title, price, description, imageUrl, null, req.user._id);
  
  product.save()
  .then(result => {
    console.log(result);
    console.log('product created!');
    res.redirect('/admin/products');
  })
  .catch(err => {
    console.log(err);
  })
  
};

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.prodId;
  Product.fetchSingleById(prodId)
  .then(product => {
    // console.log(product);
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      edit: true,
      product: product,
    });
  })
  .catch(err => console.log(err));
};

exports.postUpdateProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const prodId = req.body.edit;
 
  const product = new Product(title, price, description, imageUrl, prodId)
  product.save()
  .then(result => {
    console.log(result);
    res.redirect("/admin/products");
  })
  .catch(err => {
    console.log(err);
  })
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteSingleById(prodId)
  .then(() => {
    console.log('deleted Item with Id ', prodId);
    res.redirect("/admin/products");
  })
  .catch(err => {
    console.log("delete operation failed ", err);
  })
};

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll()
  .then(products => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Products",
      path: "/admin/products",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  })
  .catch(err => console.log(err));
};
