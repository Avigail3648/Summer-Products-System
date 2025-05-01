import React, { useState } from "react";
import axios from 'axios'

const AddProduct = () => {
    const [productname, setProductname] = useState("")
    const [color, setColor] = useState("")
    const [modele, setModele] = useState("")
    const [price, setPrice] = useState("")
    const [forage, setForage] = useState("babys")
    const [size, setSize] = useState("")
    const [sizeType, setSizeType] = useState("")
    const [picture, setPicture] = useState("")

    const sentData = (async (e) => {
        e.preventDefault();
        try {
            if (productname && price && color && modele && forage && picture) {
                const { data } = await axios.post("http://localhost:2024/api/products", {
                    "productname": productname, "color": color, "modele": modele, "price": price, "forage": forage, "size": size, "sizeType": sizeType, "picture": picture
                },
                    { headers: { 'Authorization': `Bearer ${localStorage.getItem("userToken")}` } }
                )
                alert("המוצר נוסף בהצלחה");
                setProductname("");
                setColor("");
                setModele("");
                setPrice("");
                setForage("babys");
                setSize("");
                setSizeType("");
                setPicture("");
            }
            else {
                alert("שם מוצר, צבע,דגם, מחיר, התאמה לגיל, תמונה הם שדות חובה")
            }
        }
        catch (error) {
            alert(" המוצר כבר קיים במערכת")
        }
    })

    return (
        <div>
            <form className="update-add-background">
                <h1>הוספת מוצר</h1>
                <div className="input-container" >
                    <input value={productname} onChange={(e) => setProductname(e.target.value)} placeholder="" type="text" required />שם מוצר*
                    <label>שם מוצר*</label>
                </div>
                <div className="input-container" >
                    <input value={color} onChange={(e) => setColor(e.target.value)} type="text" placeholder="" required /> צבע*
                    <label>צבע</label>
                </div>
                <div className="input-container" >
                    <input value={modele} onChange={(e) => setModele(e.target.value)} type="text" placeholder="" required />דגם*
                    <label>דגם</label>
                </div>
                <div className="input-container" >
                    <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="" required />מחיר*
                    <label>מחיר</label>
                </div>
                <select value={forage} onChange={(e) => setForage(e.target.value)}>
                    <option >babys</option>
                    <option >children</option>
                    <option>adults</option>
                </select>מתאים לגיל*
                <div className="input-container" >
                    <input value={size} onChange={(e) => setSize(e.target.value)} placeholder="" type="text" />מידה
                    <label>מידה</label>
                </div>
                <div className="input-container" >
                    <input value={sizeType} onChange={(e) => setSizeType(e.target.value)} placeholder="" type="text" />סוג המידה
                    <label>סוג מידה</label>
                </div>
                <div className="input-container" >
                    <input value={picture} onChange={(e) => setPicture(e.target.value)} placeholder="" type="text" required />תמונה*
                    <label>תמונה</label>
                </div>
                <button className="addproduct-button" onClick={sentData} >הוסף מוצר</button>
            </form>
        </div>
    )
}
export default AddProduct
