const {Schema, model} = require("mongoose")

const CarrierSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    userId: {type: Schema.Types.ObjectId, ref: "User"},
    transports: [{
        type: Schema.Types.ObjectId,
        ref: 'Transport'
    }]
})

module.exports = model('Carrier', CarrierSchema)