import axios from 'axios';
import React, { useEffect, useRef, useState, useContext } from "react";
import { Context } from "../context/Context";

export default function ForgotPassword() {
    function generateOTP() {
        var digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 4; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
    }
    const [email, setEmail] = useState("");
    const [newPass, setNewPass] = useState("");
    const [wrong, setwrong] = useState("");
    const [OTP, setOTP] = useState("");
    const [sended, setsended] = useState(false);
    const [error, seterror] = useState(false);


    const emailSend = async (e) => {
        const User = await axios.post("/isemail", { email: email, });
        if (User.data === null) {
            setsended(false)
            seterror(true);
            return
        }
        try {
            const newOtp = generateOTP();
            const res = await axios.post("/emailsend", {
                email: email,
                otp: newOtp
            });
            // const data = await res.json()
            await setsended(true);
            await seterror(false);
            window.localStorage.setItem("otp", newOtp);
            await console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
    const handleSubmit = async () => {
        const user = await axios.get("/users/user/" + email);
        console.log(user.data);
        
        const updatedPost = {
            _id: user._id
        }
        if (newPass) {
            updatedPost.password = newPass
        }
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedPost)
        };
        const response = await fetch('/users/' + user._id, requestOptions);
        const data = await response.json();
        if (data) {
            window.alert("password updated")
            window.location.replace("/login")
        }
        console.log(data);
    }
    const updatePass = async (e) => {
        e.preventDefault();
        const storedOtp = window.localStorage.getItem('otp') === OTP;
        console.log(storedOtp);
        console.log(OTP);

        if (!storedOtp) {
            setwrong(true)
            return
        }
        else {
            setwrong(false)
            handleSubmit();
        }
    }

    return (
        <>
            <div className='centerDiv' style={{ "margin-top": "60px" }}>
                <label htmlFor="" >Enter Your Email</label>
                <input autoComplete={"false"} placeholder='example@gmail.com' className="writeInput logbut" type="text" onChange={(e) => setEmail(e.target.value)} />
                <button className="loginButton " onClick={emailSend}>Send OTP</button>
                <span style={{ display: sended ? "block" : "none" }} >OTP Sended in Your Email</span>
                <span style={{ display: error ? "block" : "none" }}>Email not Found in Database Please Register</span>

                <div style={{ "margin-top": "60px", display: sended ? "block" : "none" }}>

                    <input autoComplete={"false"} placeholder='Enter OTP ' className="writeInput logbut" type="text" onChange={(e) => setOTP(e.target.value)} />

                    <span style={{ display: wrong ? "block" : "none" }}>wrong otp</span>
                    <input autoComplete={"false"} placeholder='Enter New Password' className="writeInput logbut" type="text" onChange={(e) => setNewPass(e.target.value)} />
                    <button className="loginButton " onClick={updatePass}>Update Password</button>
                </div>

            </div>
        </>
    )
}
