const {Schema, model} = require("mongoose")

const CarrierSchema = new Schema({
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    price: {type: Number, required: true},
    carrier: {
        type: Schema.Types.ObjectId,
        ref: 'Carrier'
    }
})

module.exports = model('Transport', CarrierSchema)