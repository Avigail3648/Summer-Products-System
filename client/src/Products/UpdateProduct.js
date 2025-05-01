import React, { useState } from "react";
import axios from 'axios'

function UpdateProduct(props) {
    const [productname, setProductname] = useState(props.product.productname)
    const [color, setColor] = useState(props.product.color)
    const [modele, setModele] = useState(props.product.modele)
    const [price, setPrice] = useState(props.product.price)
    const [forage, setForage] = useState(props.product.forage)
    const [size, setSize] = useState(props.product.size)
    const [sizeType, setSizeType] = useState(props.product.sizeType)
    const [picture, setPicture] = useState(props.product.picture)
    
    const id = props.product._id

    const update = (async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("userToken")
            if (!token) {
                alert("משתמש לא רשום, אינך רשאי לבצע פעולה זו")
            }
            else if (productname && price && color && modele && forage && picture) {
                const { data } = await axios.put("http://localhost:2024/api/products", {
                    id, productname, color, modele, price, forage, size, sizeType, picture
                },
                    { headers: { 'Authorization': `Bearer ${localStorage.getItem("userToken")}` } }
                )
                alert("המוצר התעדכן בהצלחה");
                props.setCurrentProduct(null)
                props.sentData()
            }
            else {
                alert(" חסרים פרטים ");
            }
        }
        catch (error) {
            alert("המוצר כבר קיים במערכת")
        }
    })

    return (
        <div>
            <div >
                <form className="update-add-background">
                    <h1>עדכון המוצר</h1>
                    <div className="input-container" >
                        <input value={productname} onChange={(e) => setProductname(e.target.value)} type="text" required />שם מוצר*
                        <label>שם מוצר</label>
                    </div>
                    <div className="input-container" >
                        <input value={color} onChange={(e) => setColor(e.target.value)} type="text" required /> צבע*
                        <label>צבע</label>
                    </div>
                    <div className="input-container" >
                        <input value={modele} onChange={(e) => setModele(e.target.value)} type="text" required />דגם*
                        <label>דגם</label>
                    </div>

                    <div className="input-container" >
                        <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" required />מחיר*
                        <label>מחיר</label>
                    </div>

                    <div className="input-container" >
                        <select value={forage} onChange={(e) => setForage(e.target.value)}>
                            <option >babys</option>
                            <option>children</option>
                            <option>adults</option>
                        </select>מתאים לגיל
                    </div>

                    <div className="input-container" >
                        <input value={size} onChange={(e) => setSize(e.target.value)} type="text" />מידה
                        <label>מידה</label>
                    </div>

                    <div className="input-container" >
                        <input value={sizeType} onChange={(e) => setSizeType(e.target.value)} type="text" />סוג המידה
                        <label>סוג מידה</label>
                    </div>

                    <div className="input-container" >
                        <input value={picture} onChange={(e) => setPicture(e.target.value)} type="text" required />תמונה*
                        <label>תמונה</label>
                    </div>
                    <button className="update-inupdate-button" onClick={update} >עדכן מוצר</button>
                </form>
            </div>
        </div>
    )
}
export default UpdateProduct
