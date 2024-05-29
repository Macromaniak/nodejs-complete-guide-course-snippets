const Product = require("../models/product");
const { getAdminProducts } = require("./shop");

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

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.prodId;
  Product.findAll({where: {id: prodId}})
  .then(product => {
    // console.log(product);
    res.render("admin/add-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      edit: true,
      product: product[0],
    });
  })
  .catch(err => console.log(err));
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const edit = req.body.edit;

  console.log('edit..', edit);
  req.user.createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
  .then(result => {
    res.redirect("/");
  })
  .catch(err => {
    console.log(err);
  })
  
  
};

exports.postUpdateProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const edit = req.body.edit;

  Product.findByPk(edit)
  .then(product => {
    product.title = title,
    product.imageUrl = imageUrl,
    product.price = price,
    product.description = description
    return product.save();
  })
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
  Product.findByPk(prodId)
  .then(product => {
    return product.destroy();
  })
  .then(() => {
    console.log('deleted Item with Id ', prodId);
    res.redirect("/admin/products");
  })
  .catch(err => {
    console.log("delete operation failed ", err);
  })
};

exports.getAdminProducts = (req, res, next) => {
  Product.findAll()
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
