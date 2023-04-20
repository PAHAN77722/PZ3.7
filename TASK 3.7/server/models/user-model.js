const {Schema, model} = require("mongoose")

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role : {type: String, required: true},
    name: {type: String},
    phone: {type: String},
    transports: [],
    orders: []
})

module.exports = model('User', UserSchema)

