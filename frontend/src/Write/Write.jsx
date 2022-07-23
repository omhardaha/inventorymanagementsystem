import React, { useContext, useState, useEffect } from "react";
import "./Write.css";
import axios from 'axios'
import { Link } from "react-router-dom"
import { Context } from "../context/Context";

export default function Write() {

    const [title, setTitle] = useState("")
    const [categorytText, setCategorytText] = useState("")
    const [description, setDescription] = useState("")
    const [price, setprice] = useState("")
    const [file, setFile] = useState(null)
    const [categories, setCategories] = useState([]);
    const [categoriesForm, setCategoriesForm] = useState([]);

    const { user, setProgress } = useContext(Context);
    useEffect(() => {
        setProgress(100);
        // const categ = await
        const fetchPosts = async () => {
            const res = await axios.get("/category");
            await setCategories(res.data)
        }
        fetchPosts();
    }, []);
    useEffect(() => {

    }, [categoriesForm])

    let insertAtArray = (a) => {
        if (!categoriesForm.includes(a)) {
            setCategoriesForm(categoriesForm => [...categoriesForm, a]);
        }
    }
    let deleteAtArray = (a) => {
        setCategoriesForm((categoriesForm) => categoriesForm.filter(val => val != a));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            title: title,
            desc: description,
            username: user.username,
            price: price,
            categories: categoriesForm,
        }
        if (file) {
            const data = new FormData();
            data.append('file', file)
            try {
                const res = await axios.post("/upload", data)
                console.log(res.data);
                newPost.photo = res.data
            } catch (error) {
                console.log(error);
            }
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPost)
        };
        const response = await fetch('/post', requestOptions);
        const data = await response.json();
        window.location.replace("/post/" + data._id)
        console.log(data);
    }
    const handleSubmitforCategoryText = async (e) => {
        if (categorytText == "") return
        e.preventDefault();
        try {
            const res = await axios.post("/category", { name: categorytText })
            console.log(res.data);
            insertAtArray(categorytText);
            setCategorytText("");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="write">

            <form className="writeForm" action="submit" onSubmit={handleSubmit}>
                <div className="writeFormGroup">

                    <input
                        required="true"
                        onChange={e => setTitle(e.target.value)}
                        type="text"
                        placeholder="Product Name"
                        className="writeInput"
                        autoFocus={true}
                    />
                    <input
                        required="true"
                        onChange={e => setprice(e.target.value)}
                        type="number"
                        placeholder="Price in ₹"
                        className="writeInput"
                        autoFocus={true}
                    />
                </div>
                <div className="writeFormGroup">
                    <textarea required="true"
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Description About Your Product"
                        className="writeInput writeText"
                    ></textarea>
                </div>
                <label htmlFor="fileInput" class="fileInputLogo" >+<i class="fa-solid fa-file-image">  Add Image</i>
                </label>
                <input type="file" id="fileInput" className="fileInput" onChange={e => setFile(e.target.files[0])} />


                <ul className="sideBarListinwrite">
                    {
                        categoriesForm.map(p => <span onClick={e => deleteAtArray(p)} className="sideBarListIteminw">{p + " "}<i class="fa-solid fa-circle-minus"></i></span>)
                    }


                </ul>
                <ul className="sideBarListinwrite2">
                    <span> Categories - </span>
                    {
                        categories.map((p, index) => (
                            <span onClick={e => insertAtArray(p.name)} className="sideBarListItem sideBarListIteminw" key={index} value={p.name} > {p.name + " "}<i class="fa-solid fa-circle-plus"></i> </span>
                        ))
                    }
                    <span className="categoryDiv">

                        <input
                            onChange={e => setCategorytText(e.target.value)}
                            value={categorytText}
                            type="text"
                            placeholder="custom"
                            className="writeInputCategory"
                            autoFocus={true}
                        />
                        <button onClick={handleSubmitforCategoryText} className="writeSubmitnew" type="submit"> <i class="fa-solid fa-circle-plus"></i> </button>
                    </span>
                </ul>
                <button className="writeSubmit" type="submit"> Add Product </button>
            </form>
            {(file && <img className="writeImage" src={URL.createObjectURL(file)} alt="" />)}
        </div>
    );
}
