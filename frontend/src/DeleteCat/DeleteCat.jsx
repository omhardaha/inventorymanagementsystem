import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "./DeleteCat.css";
import { Link } from "react-router-dom";
import Links from "./Links";
import { Context } from "../context/Context";

export default function Sidebar() {
    const [getCategories, setCategories] = useState([]);

    const { user } = useContext(Context);
    useEffect(() => {
        console.log(user);
        const fetchPosts = async () => {
            const res = await axios.get("/category");
            await setCategories(res.data)
        }
        fetchPosts();
    }, [])

    const deleteCat = async (e, h) => {
        e.preventDefault();
        console.log(h);
        try {
            const res = await axios.delete("/category",{ data: { name: h, username:user.username }});
            console.log("res.data.json()");
            await window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="delCat">
            <div className="sidebarItem">
                <span className="sideBarTitle">DELETE CATEGORIES WITH ALL YOUR POST</span>
                <ul className="sideBarList fl">
                    {
                        getCategories.map((p) => (
                            <li  onClick={(e) => deleteCat(e, p.name)} className="sideBarListItem1"> {p.name} <i class="fa-solid fa-rectangle-xmark"></i> </li>
                        ))
                    }
                </ul>

            </div>
        </div>
    );
}
