require("dotenv").config()
const connectDB = require("./config/connectDB")
const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const PORT = process.env.PORT || 2005
const app = express()
connectDB()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))

app.use("/api/auths", require("./routes/authRoute"))
app.use("/api/products", require("./routes/productRoute"))
app.use("/api/baskets", require("./routes/basketRoute"))

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port${PORT}`))
})
mongoose.connection.on('error', err => {
    console.log(err)
})