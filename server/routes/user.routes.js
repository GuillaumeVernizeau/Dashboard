const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

// authentification
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.post("/logingoogle", authController.signInGoogle);
router.get("/logout", authController.logout);

// user
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getSingleUser);
router.delete("/:id", userController.deleteUser);
router.post("/:id/widget", userController.addWidget);
router.delete("/:id/widget/:widgetId", userController.deleteWidget);
router.put("/:id/widget/:widgetId", userController.updateWidget);
router.get("/:id/widget", userController.getUserWidgets);

module.exports = router;
