const { Op, where } = require("sequelize");
const User = require("../models/User.js");
const Order = require("../models/Order.js");
const Product = require("../models/Product.js");
const Reservation = require("../models/Reservation.js");
const Table = require("../models/Table.js");
const { menuUpload } = require("../config/imageStorage.js");
const bcrypt = require("bcryptjs");

module.exports = {
  kitchenView: async (req, res) => {
    try {
      const orders = await Order.findAll({
        attributes: [
          "id",
          "reservationId",
          "status",
          "purchaseDetail",
          "lineTotal",
        ],
        where: {
          [Op.or]: [{ status: "Pending" }, { status: "Process" }],
        },
      });
      const plainOrders = orders.map((order) => order.get({ plain: true }));
      await Promise.all(
        plainOrders.map(async (data) => {
          const tableId = await Reservation.findOne({
            attributes: ["tableId"],
            where: {
              id: data.reservationId,
            },
            raw: true,
          });
          const table = await Table.findOne({
            attributes: ["tableName"],
            where: {
              id: tableId.tableId,
            },
            raw: true,
          });
          data.tableName = table?.tableName || "Unknown table";
          delete data.reservationId;
          data.purchaseDetail = JSON.parse(data.purchaseDetail);
        })
      );

      // res.json({
      //   status: "Success",
      //   data: plainOrders,
      // });
      res.render("kitchen", {
        title: "Kitchen",
        layout: "layouts/main-layout",
        data: plainOrders,
        user: req.user != undefined ? req.user : undefined,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "Error",
        error: error,
      });
    }
  },
  kitchenProcess: async (req, res) => {
    try {
      const orderId = req.params.orderId;
      await Order.update(
        { status: "Process" },
        {
          where: {
            id: orderId,
          },
        }
      );
      res.json({
        status: "Success",
      });
    } catch (error) {
      res.json({
        status: "Error",
        error: error,
      });
    }
  },
  kitchenClear: async (req, res) => {
    try {
      const orderId = req.params.orderId;
      await Order.update(
        { status: "Done" },
        {
          where: {
            id: orderId,
          },
        }
      );
      res.json({
        status: "Success",
      });
    } catch (error) {
      res.json({
        status: "Error",
        error: error,
      });
    }
  }, 

  menuView: async (req, res) => {
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
      // res.json({
      //   status: "Success",
      //   data: menus,
      // });
      res.render("menu", {
        title: "Menu",
        layout: "layouts/main-layout",
        data: menus,
        user: req.user != undefined ? req.user : undefined,
      });
    } catch (error) {
      res.json({
        status: "Error",
        error: error,
      });
    }
  },
  menuAddView: async (req, res) => {
    try {
      res.render("menuAdd", {
        title: "Add Menu",
        layout: "layouts/main-layout",
        user: req.user != undefined ? req.user : undefined,
      });
    } catch (error) {
      res.json({
        status: "Error",
        error: error,
      });
    }
  },
  menuAddPost: async (req, res) => {
    try {
      await Product.create({
        imageUrl: `http://localhost:8080/images/menu/${req.file.filename}`,
        productName: req.body.name,
        allergenIngredients: req.body.allergen,
        description: req.body.description,
        price: req.body.price,
      });
      res.json({
        status: "Success",
      });
    } catch (error) {
      res.json({
        status: "Error",
        error: error,
      });
    }
  },
  menuChangeView: async (req, res) => {
    try {
      const menu = await Product.findOne({
        attributes: [
          "id",
          "imageUrl",
          "productName",
          "allergenIngredients",
          "description",
          "price",
        ],
        where: {
          id: req.params.menuId,
        },
      });
      // res.json({
      //   status: "Success",
      //   data: menu,
      // });
      res.render("menuEdit", {
        title: "Edit Menu",
        layout: "layouts/main-layout",
        data: menu,
        user: req.user != undefined ? req.user : undefined,
      });
    } catch (error) {
      res.json({
        status: "Error",
        error: error,
      });
    }
  },
  menuChangePost: async (req, res) => {
    try {
      if (req.file.filename) {
        await Product.update(
          {
            imageUrl: `http://localhost:8080/images/menu/${req.file.filename}`,
            productName: req.body.name,
            allergenIngredients: req.body.allergen,
            description: req.body.description,
            price: req.body.price,
          },
          {
            where: {
              id: req.params.menuId,
            },
          }
        );
      } else {
        await Product.update(
          {
            productName: req.body.name,
            allergenIngredients: req.body.allergen,
            description: req.body.description,
            price: req.body.price,
          },
          {
            where: {
              id: req.params.menuId,
            },
          }
        );
      }
      res.json({
        status: "Success",
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "Error",
        error: error,
      });
    }
  },

  usersView: async (req, res) => {
    const data = await User.findAll({
      attributes: ["id", "name", "email", "role"],
    });
    res.render("users", {
      title: "Users",
      layout: "layouts/main-layout",
      data: data,
      user: req.user != undefined ? req.user : undefined,
    });
  },
  usersAddView: async (req, res) => {
    res.render("usersAdd", {
      title: "Users Add",
      layout: "layouts/main-layout",
      user: req.user != undefined ? req.user : undefined,
    });
  },
  usersAddPost: async (req, res) => {
    try {
      const data = req.body;
      const encryptPassword = await bcrypt.hash(data.password, 10);
      await User.create({
        name: data.name,
        email: data.email,
        password: encryptPassword,
        role: data.role,
      });
      res.json({ status: "Success" });
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  },
  usersDelete: async (req, res) => {
    try {
      await User.destroy({
        where: {
          id: req.params.userId,
        },
      });
      res.redirect("/users");
    } catch (error) {
      console.log(error);
      res.json({
        status: "Error",
        error: error,
      });
    }
  },
};
