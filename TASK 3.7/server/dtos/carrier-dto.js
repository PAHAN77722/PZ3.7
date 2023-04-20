const e = require("express");
module.exports = class CarrierDto {
    email;
    phone;
    name;
    transport;

    constructor(email, phone, name, transport = []) {
        this.email = email
        this.phone = phone
        this.name = name
        this.transport = transport
    }
}