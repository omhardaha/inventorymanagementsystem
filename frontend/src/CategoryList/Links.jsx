import React from 'react'
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Links.css";
import { Link } from "react-router-dom";
export default function Links() {
    const [getCategories, setCategories] = useState([]);
    const search = useLocation().search;
    const name = new URLSearchParams(search).get('cat');

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("/category");
            await setCategories(res.data)
        }
        fetchPosts();
    }, [])

    return (
        <><div class="navbar">
            <a href="#home">{name}</a>
            <div class="dropdown">
                <button class="dropbtn">Dropdown  <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-content">
                    {
                        getCategories.map((p) => (
                            <Link to={`/?cat=${p.name}`}>
                                <li className="sideBarListItem"> {p.name} </li>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div></>
    )
}
