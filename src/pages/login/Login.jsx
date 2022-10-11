import React, {useState} from 'react'
import './Login.css'
import {useLogin} from "../../hooks/useLogin";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    const {login, isPending, error} = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email,password)
    }

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h2>Log in</h2>
            <label>
                <span>Email:</span>
                <input
                    required
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>Password:</span>
                <input
                    required
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            {!isPending && <button className="btn">Log in</button>}
            {isPending && <button className="btn" disabled>Logging in...</button>}
            {error && <div className="error">{error}</div>}
        </form>
    )
}