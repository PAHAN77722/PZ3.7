const userService = require("../services/user-service")
const UserModule = require("../models/user-model")


class CarrierService {
    async addGeneralInfo(user, newInfo) {
        const newUser = await UserModule.findById(user._id).then(doc => {
            doc.set(newInfo)
            doc.save()
            return doc
        });
        return newUser
    }

    async addTransport(user, transport) {
        const newUser = await UserModule.findById(user._id).then(doc => {
            doc.transports.push(transport.transport)
            doc.save()
            return doc
        });
        return newUser
    }

}

module.exports = new CarrierService()