import axios from "axios";

const AddToBasket = async (product) => {
  const token = localStorage.getItem("userToken")
  if (!token) {
    alert("משתמש לא רשום, אינך רשאי לבצע פעולה זו")
  }
  else {
    const { data } = await axios.post("http://localhost:2024/api/baskets",
      { productid: product._id },
      { headers: { 'Authorization': `Bearer ${localStorage.getItem("userToken")}` } }
    )
    alert("  המוצר נוסף בהצלחה לסל הקנית שלך")
  }
}
export default AddToBasket