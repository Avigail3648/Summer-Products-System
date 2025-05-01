import React, { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

function Register() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    const navigate = useNavigate()

    async function sentData(e) {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:2024/api/auths/register",
                { username, password, name, email, phone })
            alert("המשתמש נרשם בהצלחה")
            navigate("/login")
        }
        catch (error) {
            console.error(error)
            alert("שם לא תקין, תנסה להניס שם אחר")
        }
    }

    return (
        <div>
            <div className="login-register-background">
                <form onSubmit={sentData}>
                    <h1>הרשמה</h1>
                    <div className="input-container" >
                        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="" required />שם משתמש*
                        <label>שם משתמש</label>
                    </div>
                    <div className="input-container">
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="" required /> סיסמה*
                        <label>סיסמה</label>
                    </div>
                    <div className="input-container">
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="" required />שם*
                        <label>שם</label>
                    </div>
                    <div className="input-container">
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="" required />*מייל
                        <label>מייל</label>
                    </div>
                    <div className="input-container">
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="" type="text" />טלפון
                        <label>טלפון</label>
                    </div>
                    <button className="register-button" type="submit" >להרשמה</button>
                </form>
            </div>
        </div>
    )
}
export default Register