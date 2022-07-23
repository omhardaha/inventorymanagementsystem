import axios from "axios";
import { useEffect, useState } from "react";
import "./CategoryList.css";
import { Link } from "react-router-dom";
import Links from "./Links";

export default function Sidebar() {
    const [getCategories, setCategories] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("/category");
            await setCategories(res.data)
        }
        fetchPosts();
    }, [])
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sideBarTitle">All CATEGORIES</span>
                <ul className="sideBarList">
                    {
                        getCategories.map((p) => (
                            <Link to={`/?cat=${p.name}`}>
                                <li className="sideBarListItem"> {p.name} </li>
                            </Link>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}
