import DeleteProduct from "./DeleteProduct"
import UpdateProduct from "./UpdateProduct"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"
import { MdDelete } from "react-icons/md"
import { GrUpdate } from "react-icons/gr"

const AdminProduct = () => {
    const [products, setProducts] = useState([])
    const [currentProduct, setCurrentProduct] = useState(null)

    const sentData = async () => {
        try {
            const { data } = await axios.get("http://localhost:2024/api/products"
            )
            setProducts(data);
        }
        catch (error) {
            if (products.length <= 1)
                setProducts([]);
            console.error(error)
        }
    }

    useEffect(() => {
        sentData()
    }, [])

    return (
        <div>
            {currentProduct ?
                <UpdateProduct product={currentProduct} id={currentProduct.id} setCurrentProduct={setCurrentProduct} sentData={sentData}></UpdateProduct> : <>
                    {localStorage.getItem("userToken") ?
                        <Link to='/product/add' className="addproduct-link" >הוסף מוצר</Link> :
                        <Link className="addproduct-link">הוסף מוצר</Link>}
                    <div className="allProducts-plist-adminp  allProducts">
                        {products.map((product, index) => {
                            return <div className="adminproduct-product" key={index}>
                                <img className="img" src={`/pictures/${product.picture}`} />
                                <div className="adminproduct-text-buttonss">
                                    <div className="adminproduct-text-detail" >
                                        {product.productname}&nbsp;
                                        {product.color}<br />
                                        מדגם {product.modele}&nbsp;
                                        {product.forage}מתאים ל<br />
                                        {product.size}&nbsp;
                                        {product.sizeType}<br></br>
                                        מחיר&nbsp;₪{product.price}
                                    </div><br />
                                    <button onClick={() => { DeleteProduct(product, sentData) }} className="delete-button"> מחק<MdDelete /></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <button onClick={() => setCurrentProduct(product)} className="update-button">עדכן <GrUpdate /></button>
                                </div>
                            </div>
                        })}</div></>}
        </div>
    )
}


export default AdminProduct   
