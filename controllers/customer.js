const Product = require("../models/Product.js");
const Table = require("../models/Table.js");

module.exports = {
  customerDashboardView: (req, res) => {
    res.redirect("/booking");
  },
  bookingView: async (req, res) => {
    const products = {
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
      tables: await Table.findAll({
        attributes: ["id", "areaId", "tableName", "seatNumber", "status"],
      }),
    };
    // res.render("reservation", {
    //   title: "Reservation",
    //   products: products,
    //   layout: "layouts/main-layout",
    // });
    res.json(products);
  },
  reservationView: async (req, res) => {
    const tableName = req.params.tableName;
    const products = {
      title: `Reservation Table ${tableName}`,
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
    // res.render("reservation", {
    //   title: "Reservation",
    //   products: products,
    //   layout: "layouts/main-layout",
    // });
    res.json(products);
  },
};
