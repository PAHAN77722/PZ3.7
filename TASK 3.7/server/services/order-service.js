const UserModule = require("../models/user-model");
const { uuid } = require('uuidv4');

class OrderService {
    async addOrder(user, clientInfo) {
        const newUser = await UserModule.findById(user._id).then(doc => {
            clientInfo.id = uuid()
            doc.orders.push(clientInfo)
            doc.save()
            return doc
        });
        return newUser
    }

    async getClientOrders(user) {
        const orders = await UserModule.findById(user._id).then(doc => {
            return doc.orders
        });
        return orders
    }

    async getFreeOrders() {
        const orders = []
        await UserModule.find({}).then(doc => {
            doc.forEach(i => {
                i._doc.orders.forEach(j => {
                   if(j.status === "find") {
                       orders.push(j)
                   }
                })
            })

        })

        return orders
    }

    async takeOrder(carIndex, idOrder, user) {
        await UserModule.find({}).then(async doc => {
            const clients = doc.filter(i => i._doc.role === "client")

            const client = clients.find(i => {
                return i._doc.orders.find(i => i.id === idOrder)
            })

            const order = client._doc.orders.find(i => i.id === idOrder)
            order.status = "take"
            user._doc.orders.push({...order, transport: user._doc.transports[carIndex].name})
            user.markModified("orders")
            await user.save()


            order.status = "found"
            order.carrier = user._doc.name
            client.markModified("orders")
            await client.save()


        })
    }
}

module.exports = new OrderService()