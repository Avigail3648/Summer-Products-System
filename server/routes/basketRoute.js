const express = require("express")
const router = express.Router()

const verifyJWT=require("../middleware/verifyJWT")

const basketController=require("../controllers/basketController")

router.use(verifyJWT)

router.get("/",basketController.getAllBaskets)
router.post("/",basketController.createNewBasket)
router.delete("/",basketController.deleteBasket)
router.get("/:id",basketController.getBasketById)
router.put("/",basketController.updateBasket)

module.exports = router