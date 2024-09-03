const Product = require("../models/Product.js");
const Table = require("../models/Table.js");

module.exports = {
  mainView: (req, res) => {
    !req.user ? res.redirect("/home") : res.redirect("/cooked");
  },
  homeView: async (req, res) => {
    const products = await Product.findAll();
    res.render("home", {
      title: "Home",
      layout: "layouts/main-layout",
      products: products,
      user: req.user != undefined ? req.user : undefined,
    });
    // res.json(products);
  },
  aboutUsView: (req, res) => {
    res.render("aboutUs", {
      title: "About Us",
      layout: "layouts/main-layout",
      user: req.user != undefined ? req.user : undefined,
    });
  },
  bookingView: async (req, res) => {
    const products = {
      products: await Product.findAll({
        user: req.user != undefined ? req.user : undefined,
        attributes: [
          "id",
          "imageUrl",
          "productName",
          "allergenIngredients",
          "description",
          "price",
          "available",
        ],
      }),
      tables: await Table.findAll({
        attributes: ["id", "areaId", "tableName", "seatNumber", "status"],
      }),
    };
    res.render("booking", {
      title: "Booking",
      products: products,
      layout: "layouts/main-layout",
      user: req.user != undefined ? req.user : undefined,
    });
    // res.json(products);
  },
  orderView: async (req, res) => {
    const tableName = req.params.tableName;
    const products = {
      title: `Reservation Table ${tableName}`,
      user: req.user != undefined ? req.user : undefined,
      products: await Product.findAll({
        attributes: [
          "id",
          "imageUrl",
          "productName",
          "allergenIngredients",
          "description",
          "price",
          "available",
        ],
      }),
    };
    // res.render("order", {
    //   title: "Order",
    //   products: products,
    //   layout: "layouts/main-layout",
    // });
    res.json(products);
  },
};
