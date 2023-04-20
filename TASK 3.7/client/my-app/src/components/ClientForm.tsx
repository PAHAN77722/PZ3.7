import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {IOrder} from "../models/IOrder";
import ClientService from "../services/ClientService";
import "./ClientForm.css"

const ClientForm = () => {
    const {store} = useContext(Context)

    const [order, setOrder] = useState<IOrder>({name: "", date: new Date(), distance: 0, price: 0, phone: "", status: "find", transport: "", carrier: ""})
    const [orders, setOrders] = useState<IOrder[]>([])

    if (store.user.role === "carrier") {
        window.location.href = "/carrier"
    }

    useEffect(() => {
        update()
    }, [])


    const createOrder =  () => {
        ClientService.createOrder(order).then(response => {
            update()
        });
    }

    const update = async () => {
        ClientService.getOrders().then(response => {
            console.log(response.data)
            setOrders(response.data)
        })
    }

    const logout = () => {
        store.logout().then(() => {
            window.location.href = "/login"
        })
    }

    const checkCreateOrder = () => {
        return order.name.length > 3 &&
            order.date &&
            order.distance > 0 &&
            order.price > 0 &&
            order.phone.length > 10
    }

    return (
        <div className="orders-container">
            <button onClick={() => logout()} className="select-button">Logout</button>
            <div className="create-order">
                <h3>Create Order</h3>
                <div className="client-form">
                    <label htmlFor="name-input">Name</label>
                    <input type="text" id="name-input" value={order.name}
                           onChange={e => setOrder({...order, name: e.target.value})}/>

                    <label htmlFor="phone-input">Phone</label>
                    <input type="tel" id="phone-input" value={order.phone}
                           onChange={e => setOrder({...order, phone: e.target.value})}/>

                    <label htmlFor="date-input">Date</label>
                    <input type="date" id="date-input"
                           onChange={e => setOrder({...order, date: new Date(e.target.value)})}/>

                    <label htmlFor="distance-input">Distance in km</label>
                    <input type="number" id="distance-input" value={order.distance}
                           onChange={e => setOrder({...order, distance: parseInt(e.target.value)})}/>

                    <label htmlFor="price-input">Price</label>
                    <input type="number" id="price-input" value={order.price}
                           onChange={e => setOrder({...order, price: parseInt(e.target.value)})}/>

                    <button onClick={() =>checkCreateOrder() ? createOrder() : alert("Incorrect Input")}>Send</button>
                </div>
            </div>
            <div className="orders-list">
                <h3>Your Orders</h3>
                {orders.map((item, index) => {
                    return <div key={index} className="order-item">
                        <div className="order-info">
                            <div className="name-phone">Name: {item.name}, Phone: {item.phone}</div>
                            <div className="date-price">Date: {new Date(item.date).toLocaleDateString()},
                                Price: {item.price}</div>
                            <div className="distance">Distance in km: {item.distance}</div>
                        </div>
                        <div className="order-status">
                            <div
                                className="status">{item.status === "find" ? "Searching for carrier" : "Carrier was found"}</div>
                            {item.status !== "find" &&
                                <div>
                                    <div className="carrier-transport">Carrier: {item.carrier}</div>
                                    <div className="carrier-transport">Transport: {item.transport}</div>
                                </div>
                            }
                        </div>
                    </div>
                })}
            </div>
        </div>

    );
};

export default observer(ClientForm);