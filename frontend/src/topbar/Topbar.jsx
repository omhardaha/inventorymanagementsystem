import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import "./Topbar.css";
export default function Topbar() {
    const { user, dispatch, setProgress } = useContext(Context);
    const handleLogOut = () => {
        setProgress(50)
        dispatch({ type: "LOG_OUT" })
        setProgress(100)
        window.location.replace("/login")
    }
    return (
        <div className="topbar">
            <div className="topLeft">
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">  <Link title="Go To HomePage" to="/">Products</Link></li>
                    <li className="topListItem"> <Link title="Write A New Blog" to="/Write">{"Add New Product"}</Link></li>
                    <li className="topListItem">  <Link title="Manage Category" to="/category">Manage Category </Link></li>
                </ul>
            </div>
            <div className="topRight">
                {(user) ?
                    (
                        <>
                            <Link title="Profile" to="/setting">
                        <li className="topListItem"> Manage Profile</li>
                                
                                {/* <img
                                    className="topRightImage"
                                    src={"http://localhost:5000/images/" + user.profilePic || "https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png"}
                                    alt=""
                                /> */}
                            </Link>

                            <li className="topListItem" title="LogOut This Page" onClick={handleLogOut}> {user && "LOGOUT"} </li>
                        </>

                    )
                    : (
                        <ul className="topList">
                            <li className="topListItem"> <a title="Login" href="/login">Login</a></li>
                            <li className="topListItem"> <a title="Create New Account" href="/register">Register</a></li>
                        </ul>
                    )}
            </div>

        </div>
    );
}
