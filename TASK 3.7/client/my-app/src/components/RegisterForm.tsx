import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import "./RegisterForm.css"

const RegisterForm = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [role, setRole] = useState<string>('client')
    const {store} = useContext(Context)

    const checkInputs = () => {
        return email.length > 5 || password.length > 3
    }

    return (
        <div className="register-form" style={{display: "flex", flexDirection: "column"}}>
            <h3>Registration Form</h3>

            <label style={{marginBottom: "10px"}}>
                Email
                <input
                    type="text"
                    placeholder='Email'
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label style={{marginBottom: "10px"}}>
                Password
                <input
                    type="password"
                    placeholder='Password'
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                />
            </label>

            <label style={{marginBottom: "10px"}}>
                Role
                <select value={role} onChange={e => {
                    setRole(e.target.value)
                }}>
                    <option value="client">Client</option>
                    <option value="carrier">Carrier</option>
                </select>
            </label>

            <button style={{width: "200px"}} onClick={() => checkInputs() ? store.registration(email, password, role) : alert("Incorrect inputs")}>Register</button>
            <a href="/login">Go to Login</a>
        </div>
    );
};

export default observer(RegisterForm);