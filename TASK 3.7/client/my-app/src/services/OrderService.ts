import {AxiosResponse} from "axios";
import {IFreeOrders} from "../models/IFreeOrders";
import $api from "../http";

export default class OrderService {
    static getFreeOrders(): Promise<AxiosResponse<IFreeOrders[]>> {
        return $api.get("/get-free-orders")
    }

    static takeOrder(carIndex : string, idOrder: string) : void {
         $api.post("/take-order", {carIndex, idOrder})
    }
}