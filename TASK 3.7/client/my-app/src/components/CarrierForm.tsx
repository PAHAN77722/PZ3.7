import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ICarrierInfo} from "../models/response/CarrierInfoResponse";
import CarrierService from "../services/CarrierService";
import {ITransport} from "../models/ITransport";
import {IFreeOrders} from "../models/IFreeOrders";
import OrderService from "../services/OrderService";
import "./CarrierForm.css"

const CarrierForm = () => {
    const {store} = useContext(Context)
    const [carrierInfo, setCarrierInfo] = useState<ICarrierInfo>()
    const [name, setName] = useState<string>("")
    const [tel, setTel] = useState<string>("")
    const [transport, setTransport] = useState<ITransport>({capacity: 0, name: "", price: 0})
    const [freeOrders, setFreeOrders] = useState<IFreeOrders[]>([])
    const [selectedCar, setSelectedCar] = useState<string>("")
    const [selectedOrder, setSelectedOrder] = useState<string>("")

    useEffect(() => {
        updateInfo()
    }, [])

    useEffect(() => {
        updateInfo()
    }, [freeOrders])

    const updateInfo = () => {
        CarrierService.fetchInfo().then(response => {
            setCarrierInfo(response.data)
        })

        OrderService.getFreeOrders().then(response => {
            console.log(response.data)
            setFreeOrders(response.data)
        })
    }

    const addGeneralInfo = async () => {
        const data = await CarrierService.addGeneralInfo(name, tel)
        updateInfo()
    }

    const addTransport = async () => {
        const data = await CarrierService.addTransport(transport)
        updateInfo()
    }

    if (store.user.role === "client") {
        window.location.href = "/client"
    }

    const takeOrder = async () => {
        OrderService.takeOrder(selectedCar, selectedOrder)

        updateInfo()
    }

    const checkAddTransport = () => {
        return transport.name.length > 3 && transport.price > 0 && transport.capacity > 0
    }

    const checkGeneralInfo = () => {
        return name.length > 3 && tel.length > 10
    }

    const logout = () => {
        store.logout().then(() => {
            window.location.href = "/login"
        })
    }

    const checkTakeOrder = () => {
        return selectedOrder !== "" && selectedCar !== ""
    }

    return (
        <div>
            <button onClick={() => logout()} className="select-button">Logout</button>
            <div className="carrier-info">
                <h3>Info</h3>
                <div>Name: {carrierInfo?.name || "Please enter your name"}</div>
                <div>Phone: {carrierInfo?.phone || "Please enter your phone"}</div>
                <div>Email: {carrierInfo?.email}</div>
                <h3>Transport</h3>
                {carrierInfo?.transports.map(item => {
                    return <div>Name: {item?.name}, Price for 1 km: {item?.price}, Capacity: {item?.capacity}</div>
                })}
            </div>
            <div>
                <div className="general-info-container">
                    <h3 className="general-info-heading">Update General Info</h3>
                    <div className="general-info-form">
                        <div className="general-info-input-container">
                            <label className="general-info-label" htmlFor="name-input">Name</label>
                            <input className="general-info-input" id="name-input" type="text" value={name}
                                   onChange={e => setName(e.target.value)}/>
                        </div>
                        <div className="general-info-input-container">
                            <label className="general-info-label" htmlFor="phone-input">Phone</label>
                            <input className="general-info-input" id="phone-input" type="text" value={tel}
                                   onChange={e => setTel(e.target.value)}/>
                        </div>
                        <button className="general-info-save-button"
                                onClick={() => checkGeneralInfo() ? addGeneralInfo() : alert("Incorrect inputs")}>Save
                        </button>
                    </div>
                </div>

                <div className="transport-form">
                    <h3>Add Transport</h3>
                    <div>
                        <div className="form-group">
                            <label htmlFor="transport-name">Name:</label>
                            <input id="transport-name" type="text" value={transport.name}
                                   onChange={e => setTransport({...transport, name: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="transport-price">Price:</label>
                            <input id="transport-price" type="number" value={transport.price}
                                   onChange={e => setTransport({...transport, price: parseInt(e.target.value)})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="transport-capacity">Capacity:</label>
                            <input id="transport-capacity" type="number" value={transport.capacity}
                                   onChange={e => setTransport({...transport, capacity: parseInt(e.target.value)})}/>
                        </div>
                        <button className="general-info-save-button" onClick={() => checkAddTransport() ? addTransport() : alert("Incorrect inputs")}>Save
                        </button>
                    </div>
                </div>


            </div>
            <div className="order-container">
                <h3>Select The Free Orders</h3>
                <h4>Count of free orders is {freeOrders.length}</h4>
                <h4>Select a car</h4>
                <select className="car-select" onChange={e => setSelectedCar(e.target.value)}>
                    <option selected value="">Select a car</option>
                    {carrierInfo?.transports.map((item, index) => {
                        return <option value={index}>{item.name}</option>
                    })}
                </select>
                <button className="select-button"
                        onClick={() => checkTakeOrder() ? takeOrder() : alert("Incorrect input")}>Select the order
                </button>
                {freeOrders.map(item => {
                    return <div className="order-details" key={item.id}>
                        <input name="order_rad" type="radio" value={item.id} onChange={e => {
                            setSelectedOrder(e.target.value)
                        }}/>
                        <div className="customer-details">Name: {item.name} Phone: {item.phone},
                            Date: {new Date(item.date).toLocaleDateString()}</div>
                        <div className="order-price">Distance in km: {item.distance} , Price: {item.price}</div>
                    </div>
                })}
            </div>

        </div>
    );
};

export default observer(CarrierForm);