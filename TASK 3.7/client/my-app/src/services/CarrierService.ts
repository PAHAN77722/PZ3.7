import {ICarrierInfo} from "../models/response/CarrierInfoResponse";
import {AxiosResponse} from "axios";
import $api from "../http";
import {ITransport} from "../models/ITransport";

export default class CarrierService {
    static addGeneralInfo(name: string, phone: string): Promise<AxiosResponse<ICarrierInfo>> {
        return $api.post<ICarrierInfo>("/add-general-info", {name, phone})
    }

    static addTransport(transport: ITransport): Promise<AxiosResponse<ITransport>> {
        return $api.post<ITransport>("/add-transport", {transport})
    }

    static fetchInfo(): Promise<AxiosResponse<ICarrierInfo>> {
        return $api.post<ICarrierInfo>("/get-carrier-info")
    }

}