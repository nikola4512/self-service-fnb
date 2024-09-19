const moment = require("moment");

const Product = require("../models/Product.js");
const Table = require("../models/Table.js");
const Reservation = require("../models/Reservation.js");
const Discount = require("../models/Discount.js");
const Tax = require("../models/Tax.js");
const Invoice = require("../models/Invoice.js");
const Order = require("../models/Order.js");

module.exports = {
  mainView: (req, res) => {
    // !req.user ? res.redirect("/home") : res.redirect("/kitchen");
    res.status(200).redirect("/home");
  },
  homeView: async (req, res) => {
    try {
      const products = await Product.findAll({
        attributes: [
          "id",
          "imageUrl",
          "productName",
          "allergenIngredients",
          "description",
          "price",
          "available",
        ],
      });
      res.status(200).json({
        status: "Success",
        data: products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "Error",
        error: error,
      });
    }
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
    res.json(products);
  },

  reservationBaseView: async (req, res) => {
    if (await Table.findOne({ where: { tableName: req.params.tableName } })) {
      try {
        const menus = await Product.findAll({
          attributes: [
            "id",
            "imageUrl",
            "productName",
            "allergenIngredients",
            "description",
            "price",
            "available",
          ],
        });
        res.json({
          status: "Success",
          data: { menus },
        });
      } catch (error) {
        res.json({
          status: "Error",
          error: error,
        });
      }
    } else {
      res.json({
        status: "Unknown Table Name",
      });
    }
  },
  reservationBasePost: async (req, res) => {
    const tableId = await Table.findOne({
      attributes: ["id"],
      where: {
        tableName: req.params.tableName, //
      },
    });
    if (tableId) {
      try {
        let lineTotal = 0;
        req.body.menu.forEach((product) => {
          totalProductPrice = product.quantity * product.totalProductPrice;
          lineTotal = lineTotal + totalProductPrice;
        });
        // const discounts = Discount.findAll({
        //   attributes: [
        //     'id',
        //     'name',
        //     'type',
        //     'minimumPurchase',
        //     'maximumPurchase',
        //     'value'
        //   ],
        //   where: {
        //     minimumPurchase: {
        //       [Op.lt]: lineTotal
        //     },
        //     maximumPurchase: {
        //       [Op.gt]: lineTotal,
        //     }
        //   }
        // })
        const invoice = await Invoice.create({
          date: moment().format("YYYY-MM-DD HH:mm:ss"),
        });
        const encryptPin = await bcrypt.hash(req.body.pin, 10);
        const reservation = await Reservation.create({
          invoiceId: invoice.id,
          tableId: tableId,
          status: "pending",
          reservationPin: encryptPin,
        });
        await Order.create({
          reservationId: reservation.id,
          status: "pending",
          purchaseDetail: req.body.menu,
          lineTotal: lineTotal,
        });
        res.json({
          status: "Success",
          // redirectUrl:
        });
      } catch (error) {
        res.status(500).json({
          status: "Error",
          error: error,
        });
      }
    } else {
      res.json({
        status: "Unknown Table Name",
      });
    }
  },
};
