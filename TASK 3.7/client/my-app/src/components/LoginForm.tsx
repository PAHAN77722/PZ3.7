import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import "./loginForm.css"
const LoginForm = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context)

    const checkInputs = () => {
      return email.length > 5 || password.length > 3
    }

    return (
        <div className="login-form">
            <h3>Login Form</h3>
            <input
                type="text"
                placeholder='Email'
                onChange={e => setEmail(e.target.value)}
                value={email}
            />
            <input
                type="password"
                placeholder='Password'
                onChange={e => setPassword(e.target.value)}
                value={password}
            />

            <button onClick={() => checkInputs() ? store.login(email, password) : alert("Incorrect inputs")}>Login</button>
            <a href="/registration">Go to Registration</a>
        </div>
    );
};

export default observer(LoginForm);