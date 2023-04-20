import React, {FC, useContext, useEffect, useState} from 'react';
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {Navigate, Route, Routes} from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import ClientForm from "./components/ClientForm";
import CarrierForm from "./components/CarrierForm";
import "./app.css"

const App: FC = () => {
    const {store} = useContext(Context)
    const [isLoad, setIsLoad] = useState<boolean>(false)

    useEffect(() => {
        if (localStorage.getItem("token")) {

            store.checkAuth().then((isAuthenticated) => {
                if (!isAuthenticated) {
                    store.setAuth(false)
                }
                setIsLoad(true)
            });
        } else {
            setIsLoad(true)
        }
    }, [])

    return (
        <div className="App">
            <Routes>
                {isLoad &&
                    (
                        <>
                            <Route path={"/"} element={store.isAuth ? <ClientForm/> : <Navigate to={"/login"}/> }/>
                            <Route path={"/registration"} element={store.isAuth ? <ClientForm/>:<RegisterForm/>}/>
                            <Route path={"/login"} element={store.isAuth ? <ClientForm/>:<LoginForm/>}/>
                            <Route path={"/client"} element={store.isAuth ? <ClientForm/> : <Navigate to="/login"/>}/>
                            <Route path={"/carrier"} element={store.isAuth ? <CarrierForm/> : <Navigate to="/login"/>}/>
                        </>
                    )
                }
            </Routes>

        </div>
    );
}

export default observer(App);
