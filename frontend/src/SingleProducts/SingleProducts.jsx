import { useLocation } from "react-router-dom";
import "./SingleProducts.css";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";


export default function SingleProducts() {
    window.onbeforeunload = function () {
        window.scrollTop(40)
    }
    const location = useLocation()
    const postId = location.pathname.split("/")[2];

    const { user, setProgress } = useContext(Context);
    const [getPost, setPost] = useState({})
    useEffect(() => {
        setProgress(40)
        const fetchPosts = async () => {
            const res = await axios.get(`/post/${postId}`);
            await setPost(res.data);
            // console.log(res.data);
            await setProgress(100);
        }
        fetchPosts();
    }, [postId])

    const handleDelete = async () => {
        try {
            await axios.delete("/post/" + postId, { data: { username: user.username } })
            await window.location.replace('/')
        } catch (error) {
            console.log(error);
        }
    }

    //updatingUser
    const [titleInput, setTitleInput] = useState()
    const [descInput, setDescInput] = useState()
    const [updateMode, setUpdateMode] = useState(false)

    const handleUpdate = async () => {
        console.log("tre");
        try {
            const submitData = {
                username: user.username,
                desc: descInput,
                title: titleInput
            };
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData)
            };
            const response = await fetch('/post/' + postId, requestOptions);
            const data = await response.json();
            console.log(data);
            await window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">

                {!updateMode ?
                    <h1 className="singlePostTitle">
                        {getPost.title}
                        {getPost.photo && <img src={"http://localhost:5000/images/" + getPost.photo} alt="" className="singlePostImage" />}
                        {
                            user && getPost.username === user.username &&
                            <div className="singlePostEdit">
                                <i className="singlePostEditIcon fa-solid fa-pen-to-square" onClick={() => setUpdateMode(true)}>Update</i>
                                <i className="singlePostEditIcon fa-solid fa-trash" onClick={handleDelete}>Delete</i>
                            </div>
                        }
                    </h1> : (
                        <>
                            <h4>Update Title</h4>
                            <input type="text" id="changeTitle" defaultValue={getPost.title} onChange={(e) => setTitleInput(e.target.value)} />
                        </>
                    )
                }

                <div className="singlePostInfo">
                    <span className="singlePostauthorName">
                        Author :
                        <Link to={`/?username=${getPost.username}`}>
                            <b>{getPost.username}</b>
                        </Link>
                    </span>
                    {/* <span className="singlePostDate">{new Date(getPost.createdAt).toDateString()}</span> */}
                </div>
                {
                    !updateMode ?
                        <p className="singlePostParagraph">
                            {getPost.desc}
                        </p>
                        : (
                            <>
                                <h4>Change Description</h4>
                                <textarea onChange={(e) => setDescInput(e.target.value)} defaultValue={getPost.desc} name="" id="" cols="30" rows="10"></textarea>
                                <button onClick={handleUpdate}>Update</button>
                            </>
                        )
                }
            </div>
        </div>
    );
}
