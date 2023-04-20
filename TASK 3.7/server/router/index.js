const Router = require("express").Router
const userController = require("../controllers/user-controller")
const carrierController = require("../controllers/carrier-controller")
const orderController = require("../controllers/order-controller")
const router = new Router()
const {body} = require("express-validator")


router.post("/registration",
    body("email").isEmail(),
    body("password").isLength({min: 3, max: 32}),
    body("role").isLength({min: 3, max: 32}),
    userController.registration)
router.post("/login", userController.login)
router.post("/logout", userController.logout)
router.get("/refresh", userController.refresh)
router.post("/add-general-info", carrierController.addGeneralInfo)
router.post("/add-transport", carrierController.addTransport)
router.post("/get-carrier-info", carrierController.getCarrierInfo)
router.post("/get-client-orders", orderController.getClientOrders)
router.post("/create-order", orderController.createOrder)
router.get("/get-free-orders", orderController.getFreeOrders)
router.post("/take-order", orderController.takeOrder)

module.exports = router