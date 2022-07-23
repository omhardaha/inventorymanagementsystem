import "./Home.css";
import Products from "../../Products/Products";
import CategoryList from "../../CategoryList/CategoryList";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "../../context/Context";


export default function Home() {

    const { setProgress } = useContext(Context);
    const [getPosts, setPosts] = useState([])
    const { search } = useLocation()

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("/post" + search);
            setProgress(50)
            await setPosts(res.data);
            setProgress(100)
        }
        fetchPosts();
    }, [search])
    
    return (
        <>
            {/* <Header /> */}
            <div className="home">
                <CategoryList />
                <Products getPosts={getPosts} />
            </div>
        </>
    );
}
