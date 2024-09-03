module.exports = {
  cookedView: (req, res) => {
    res.render("cooked", {
      title: "Cooked",
      layout: "layouts/main-layout",
      user: req.user != undefined ? req.user : undefined,
    });
  },
  // dashboardView: (req, res) => {
  //   res.render("dashboard", {
  //     title: "Dashboard",
  //     layout: "layouts/main-layout",
  //     user: req.user != undefined ? req.user : undefined,
  //   });
  // },
};
