import axios from "axios";
const DeleteProduct = async (product, sentData) => {
  const token = localStorage.getItem("userToken")
  if (!token) {
    alert("משתמש לא רשום, אינך רשאי לבצע פעולה זו")
  }
  else {
    const { data } = await axios.delete("http://localhost:2024/api/products", {
      data: { id: product._id },
      headers: { 'Authorization': `Bearer ${localStorage.getItem("userToken")}` }
    })
  }
  sentData()
}
export default DeleteProduct;

