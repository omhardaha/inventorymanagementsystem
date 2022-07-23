import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import "./Register.css"

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const handleSubmit = async (e) => {
        setError(false);
        e.preventDefault();
        try {
            const res = await axios.post("/auth/register", {
                username, email, password
            });
            res.data && window.location.replace("/login")
        } catch (error) {
            setError(true)
        }
    }
    return (
        <div className="login">
            <span className="loginTitle">Register</span>
            <form action="" className="loginForm" onSubmit={handleSubmit}>
                <label htmlFor=""></label>
                <input type="text" placeholder="Enter You UserName" onChange={e => setUsername(e.target.value)} />
                <label htmlFor=""></label>
                <input type="text" placeholder="Enter You Email" onChange={e => setEmail(e.target.value)} />
                <label htmlFor=""></label>
                <input type="password" placeholder="Enter You Password" onChange={e => setPassword(e.target.value)} />
                <button className="loginButton" type="submit">Register  </button>
            </form>
            {error && <span style={{ "margin-top": "20px" }}> Something Went Wrong </span>}
            <button className="loginRegisterButton">
                <Link to="/Login">Login</Link>
            </button>
        </div>
    )
}
