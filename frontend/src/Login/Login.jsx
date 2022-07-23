import "./Login.css"
import { Link } from "react-router-dom"
import { useContext, useRef, useEffect } from "react";
import { Context } from "../context/Context";
import axios from "axios";
export default function Login() {
    const userRef = useRef();
    const passwordRef = useRef();
    const { user, dispatch, isFetching, setProgress } = useContext(Context);
    const handleSubmit = async (e) => {
        // console.log(userRef.current.value);
        // console.log(passwordRef.current.value);
        // setProgress(30)
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            setProgress(60)

            const body = {
                username: userRef.current.value,
                password: passwordRef.current.value,
            };
            const res = await axios.post('/auth/login', body);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
            window.location.replace("/")
        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE" });
        }
        await setProgress(100)

    }
    console.log(user);
    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form action="" className="loginForm" onSubmit={handleSubmit}>
                <label htmlFor="" >Username</label>
                <input type="text" placeholder="Enter You UserName" ref={userRef} />
                <label htmlFor="">Password</label>
                <input type="password" placeholder="Enter You Email" ref={passwordRef} />
                <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
            </form>
            <button className="loginButton" ><Link to="/forgotpassword">
                Forgot Password
            </Link></button>
            
            <button className="loginRegisterButton" ><Link to="/Register">
                Register
            </Link></button>
        </div>
    )
}
