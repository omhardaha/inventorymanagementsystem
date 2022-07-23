import React from 'react'
import CategoryList from '../CategoryList/CategoryList'
import DeleteCat from '../DeleteCat/DeleteCat'
import { useContext, useState, useEffect } from "react";
import axios from 'axios'
import "./ManageCat.css"

export default function ManageCat() {
    const [categorytText, setCategorytText] = useState("")

    const [categoriesForm, setCategoriesForm] = useState([]);
    let insertAtArray = (a) => {
        if (!categoriesForm.includes(a)) {
            setCategoriesForm(categoriesForm => [...categoriesForm, a]);
        }
    }
    const handleSubmitforCategoryText = async (e) => {
        if (categorytText == "") return
        e.preventDefault();
        try {
            const res = await axios.post("/category", { name: categorytText })
            console.log(res.data);
            insertAtArray(categorytText);
            setCategorytText("");
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <CategoryList />

            <div className="categoryDiv hmanage">
                <div className='pdiv'>
                    <span>Add Category </span>
                    <input
                        onChange={e => setCategorytText(e.target.value)}
                        value={categorytText}
                        type="text"
                        placeholder="custom"
                        className="writeInputCategory"
                        autoFocus={true}
                    />
                    <button onClick={handleSubmitforCategoryText} className="writeSubmitnew" type="submit"> <i class="fa-solid fa-circle-plus"></i> </button>
                </div>
            </div>

            <DeleteCat/>

        </>
    )
}
