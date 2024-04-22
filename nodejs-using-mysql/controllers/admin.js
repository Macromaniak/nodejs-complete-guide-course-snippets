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
  Product.getProductDetailsById(prodId)
  .then(([product]) => {
    console.log(product);
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

  const product = new Product(title, imageUrl, price, description);

  if (edit === "-1") {
    product
      .save()
      .then(([response]) => {
        console.log(response);
        res.redirect("/");
      })
      .catch((err) => console.log(err));
  } else {
    product.save(edit).then(([response]) => {
      console.log(response);
      res.redirect("/admin/products");
    });
  }
};

exports.postDeleteProduct = (req, res, next) => {
  prodId = req.body.productId;
  Product.deleteProduct(prodId)
  .then(([response]) => {
    console.log(response);
    res.redirect("/admin/products");
  })
  .catch(err => {
    console.log("something went wrong ", err);
  })
};

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([products]) => {
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
