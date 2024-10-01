const momenttz = require("moment-timezone");
const bcrypt = require("bcryptjs");

const Product = require("../models/Product.js");
const Table = require("../models/Table.js");
const Reservation = require("../models/Reservation.js");
const Discount = require("../models/Discount.js");
const Tax = require("../models/Tax.js");
const Invoice = require("../models/Invoice.js");
const Order = require("../models/Order.js");

module.exports = {
  menuView: async (req, res) => {
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
        status: "success",
        code: 200,
        message: "request success",
        data: products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        code: 500,
        message: "database connection failed",
        error: {
          name: error.name,
          message: error.message,
        },
      });
    }
  },

  bookingBasePost: async (req, res) => {
    {
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
    }
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
    try {
      const tableId = await Table.findOne({
        attributes: ["id"],
        where: {
          tableName: req.params.tableName,
        },
      });

      if (!tableId) {
        throw new Error("invalid table name.");
      }

      let lineTotal = 0;
      req.body.ordered_food.forEach((product) => {
        lineTotal = lineTotal + product.quantity * product.price;
      });

      const orderedFood = req.body.ordered_food.map((product) => {
        product.status = "waiting";
      });

      const invoice = await Invoice.create({
        date: momenttz().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss"),
      });

      const encryptPin = await bcrypt.hash(req.body.pin, 10);

      const reservation = await Reservation.create({
        invoiceId: invoice.id,
        tableId: tableId.id,
        status: "waiting",
        reservationPin: encryptPin,
      });

      await Order.create({
        reservationId: reservation.id,
        purchaseDetail: JSON.stringify(req.body.ordered_food),
        lineTotal: lineTotal,
      });

      res.status(201).json({
        status: "success",
        code: 201,
        message: "post data success.",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        code: 500,
        message: "can't post data",
        error: {
          name: error.name,
          message: error.message,
        },
      });
    }
  },
};
