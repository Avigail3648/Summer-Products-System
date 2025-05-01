import React, { useEffect, useState } from "react";
import axios from "axios";
import RemoveFromBasket from "../Basket/RemoveFromBasket";
import { MdRemoveShoppingCart } from "react-icons/md";

const BaskerList = () => {
    const [baskets, setBaskets] = useState([])

    const getAllMyBaskets = async () => {
        try {
            const { data } = await axios.get("http://localhost:2024/api/baskets"
                , { headers: { 'Authorization': `Bearer ${localStorage.getItem("userToken")}` } }
            )
            setBaskets(data);
        }
        catch (error) {
            if (baskets.length <= 1)
                setBaskets(null);
            console.error(error)
        }
    }
    
    useEffect(() => {
        getAllMyBaskets()
    }, [])

    return (
        <div className="allProductsInBasket">
            {baskets ? (<>
                <h1 className="basket-title">סל הקניות שלך</h1>
                <div className="allProductsInBasket">
                    {baskets.map((basket, index) => {
                        return <div className="basket-item" key={index}>
                            <img className="basket-image" src={`/pictures/${basket.picture}`} alt={basket.productname} />
                            <div className="basket-text-button">
                                <div className="basket-text">
                                    {basket.productname}<br></br>
                                    ₪  {basket.price}
                                </div>
                                <button className="basket-button" onClick={() => { RemoveFromBasket(basket, getAllMyBaskets) }} >remove<MdRemoveShoppingCart /></button>
                            </div>
                            <div className="separator"></div>
                        </div>
                    })}</div> </>) : (<h2 className="basket-not-found">לא נמצאו מוצרים בסל הקניות</h2>)}
        </div>
    )
}

export default BaskerList