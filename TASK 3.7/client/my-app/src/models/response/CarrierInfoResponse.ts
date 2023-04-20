import {ITransport} from "../ITransport";

export interface ICarrierInfo {
    email: string,
    phone: string,
    name: string,
    transports: ITransport[]
}