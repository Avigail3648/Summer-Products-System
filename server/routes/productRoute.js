const express = require("express")
const router = express.Router()
const verifyJWT = require("../middleware/verifyJWT")

const productController = require("../controllers/productController")

router.get("/",productController.getAllProducts)
router.post("/",verifyJWT,productController.createNewProduct)
router.delete("/",verifyJWT,productController.deleteProduct)
router.get("/byId",productController.getProductById)
router.put("/",verifyJWT,productController.updateProduct)

module.exports = router