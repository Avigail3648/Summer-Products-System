import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom"

function Login() {
    const [username, setName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function sentData(e) {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:2024/api/auths/login",
                { username, password })
            localStorage.setItem("userToken", data.accessToken)
            navigate("/products")
        }
        catch (error) {
            alert("משתמש לא רשום, או שהשם והסיסמה לא תואמים")
            setName("")
            setPassword("")
        }
    }

    const toNavigate = () => {
        navigate("/register")
    }

    return (
        <div>
            <div className="login-register-background">
                <form onSubmit={sentData}>
                    <h2>כניסה</h2>
                    <div className="input-container">
                        <input value={username} onChange={(e) => setName(e.target.value)} type="text" placeholder=" " required />שם משתמש*
                        <label>שם משתמש</label>
                    </div>
                    <div className="input-container">
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder=" " required />סיסמה*
                        <label>סיסמה</label>
                    </div>
                    <button className="login-button" type="submit">לכניסה</button>
                    <h2>משתמש לא רשום?</h2>
                    <button className="login-button" type="button" onClick={toNavigate}>להרשמה</button>
                </form>
            </div>
        </div>
    )
}
export default Login