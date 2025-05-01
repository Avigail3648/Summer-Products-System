import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import AddToBasket from "../Basket/AddToBasket";

const ProductList = () => {
    const [products, setProducts] = useState([])

    const sentData = async () => {
        try {
            const { data } = await axios.get("http://localhost:2024/api/products"
            )
            setProducts(data);
        }
        catch (error) {
            console.error(error)
        }
    }
    
    useEffect(() => {
        sentData()
    }, [])

    return (
        <div>
            
            <h1 className="welcome">ברוכים הבאים לאתר מוצרי הקיץ שלנו</h1>
            <div className="allProducts-plist-adminp allProducts">
                {products.map((product, index) => {
                    return <div className="product" key={index}>
                        <img className="img" width="250px" height="250px" src={`/pictures/${product.picture}`} />
                        <br />
                        <div className="product-text-detail">
                            {product.productname}&nbsp;
                            {product.color}<br />
                            מדגם {product.modele}&nbsp;
                            {product.forage}מתאים ל<br />
                            {product.size}&nbsp;
                            {product.sizeType}<br></br>
                            מחיר&nbsp;₪{product.price}
                        </div>
                        <button onClick={() => { AddToBasket(product, sentData) }} className="add-to-basket-button">הוסף לסל<MdOutlineAddShoppingCart /></button>
                    </div>
                })}
            </div>
        </div>
    )
}

export default ProductList   
