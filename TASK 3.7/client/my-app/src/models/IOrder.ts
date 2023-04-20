import {ITransport} from "./ITransport";

export interface IOrder {
    name: string,
    phone: string,
    date: Date,
    distance: number,
    price: number
    carrier: string,
    transport: string
    status: "find"
}