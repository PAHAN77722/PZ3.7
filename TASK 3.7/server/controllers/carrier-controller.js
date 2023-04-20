const carrierService = require("../services/carrier-service")
const userService = require("../services/user-service")
const CarrierDto = require("../dtos/carrier-dto")
class CarrierController {
    async addGeneralInfo(req, res, next){
        try {
            const {refreshToken} = req.cookies
            const user = await userService.checkUser(refreshToken);

            const newUser = await carrierService.addGeneralInfo(user, req.body)

            return res.json(newUser)
        } catch (e) {
            next(e)
        }
    }

    async addTransport(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const user = await userService.checkUser(refreshToken);

            const newUser = await carrierService.addTransport(user, req.body)

            return res.json(newUser)
        } catch (e) {
            next(e)
        }
    }

    async getCarrierInfo(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const user = await userService.checkUser(refreshToken);

            return res.json(user)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new CarrierController()