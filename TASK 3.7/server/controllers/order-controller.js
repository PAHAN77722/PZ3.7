const userService = require("../services/user-service");
const orderService = require("../services/order-service");

class OrderController {
    async createOrder(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const user = await userService.checkUser(refreshToken);

            const newUser = await orderService.addOrder(user, req.body)

            return res.json(newUser)
        } catch (e) {
            next(e)
        }
    }

    async getClientOrders(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const user = await userService.checkUser(refreshToken);

            const orders = await orderService.getClientOrders(user)

            return res.json(orders)
        } catch (e) {
            next(e)
        }
    }

    async getFreeOrders(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const user = await userService.checkUser(refreshToken);

            const orders = await orderService.getFreeOrders()

            return res.json(orders)
        } catch (e) {
            next(e)
        }
    }

    async takeOrder(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const user = await userService.checkUser(refreshToken);

            const {carIndex, idOrder} = req.body

            await orderService.takeOrder(carIndex, idOrder, user)

            return res.status(200)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new OrderController()