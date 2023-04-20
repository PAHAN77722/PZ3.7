import $api from "../http";
import {AxiosResponse} from "axios";
import {IUser} from "../models/IUser";
import {IOrder} from "../models/IOrder";

export default class ClientService {
    static createOrder(order: IOrder): Promise<AxiosResponse> {
      return   $api.post("/create-order", order)
    }

    static getOrders() : Promise<AxiosResponse<IOrder[]>> {
       return  $api.post<IOrder[]>("/get-client-orders")
    }
}