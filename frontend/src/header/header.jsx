import React from "react";
import "./header.css";

import Slider from "./slider"
import { useContext } from "react";
import { Context } from "../context/Context";
export default function Header() {
    return (
        <div className="header">
            <div className="headerTitles">
                {/* <div className="headerTitleSm">Hey , it is OM Hardaha</div> */}
                <div className="headerTitleLg">WelCome To My Blog</div>
            </div>
            {/* <Slider/> */}
            <img
                className="headerImage"
                src="https://images.unsplash.com/photo-1648942754609-2d5593c5e23e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1228&q=80"
                alt=""
            />

        </div>
    );
}
