const express = require("express");
const userController = require("../controllers/user.js");
const { protectRoute } = require("../config/auth.js");
const { menuUpload } = require("../config/imageStorage.js");

const router = express.Router();

router.get("/kitchen", protectRoute, userController.kitchenView);
router.patch(
  "/kitchen/:orderId/process",
  protectRoute,
  userController.kitchenProcess
);
router.patch(
  "/kitchen/:orderId/clear",
  protectRoute,
  userController.kitchenClear
);

router.get("/owner/menu", protectRoute, userController.menuView);
router.get("/owner/menu/add", protectRoute, userController.menuAddView);
router.post(
  "/owner/menu/add",
  protectRoute,
  menuUpload.single("image"),
  userController.menuAddPost
);
router.get(
  "/owner/menu/:menuId/change",
  protectRoute,
  userController.menuChangeView
);
router.post(
  "/owner/menu/:menuId/change",
  protectRoute,
  menuUpload.single("image"),
  userController.menuChangePost
);
// router.delete("/menu/delete", userController.menuDelete);

router.get("/users", protectRoute, userController.usersView);
router.get("/users/add", protectRoute, userController.usersAddView);
router.post("/users/add", protectRoute, userController.usersAddPost);
router.delete(
  "/users/:userId/delete",
  protectRoute,
  userController.usersDelete
);

module.exports = router;
