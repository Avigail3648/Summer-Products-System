import axios from "axios";
const RemoveFromBasket = async (product, getAllMyBaskets) => {
  const token = localStorage.getItem("userToken")
  if (!token) {
    alert("משתמש לא רשום, אינך רשאי לבצע פעולה זו")
  }
  else {
    const { data } = await axios.delete("http://localhost:2024/api/baskets", {
      data: { id: product._id },
      headers: { 'Authorization': `Bearer ${localStorage.getItem("userToken")}` }
    }
    )
  }
  getAllMyBaskets()
}

export default RemoveFromBasket