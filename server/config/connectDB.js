const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASEURI)
    } catch (err) {
        console.error("*****error connection to DB****\n" + err)
    }
}
module.exports = connectDB