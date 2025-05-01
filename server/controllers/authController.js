const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require("../models/User")

const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }
    const foundedUser = await User.findOne({ username }).lean()
    if (!foundedUser || !foundedUser.active) {
        return res.status(401).json({ message: "Unauthourized" })
    }
    const match = await bcrypt.compare(password, foundedUser.password)
    if (!match) {
        return res.status(401).json({ message: "Unauthourized" })
    }
   
    const userInfo = {
        _id: foundedUser._id,
        name: foundedUser.name,
        username: foundedUser.username,
        roles: foundedUser.roles,
        email: foundedUser.email
    }

    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    
    res.json({ accessToken: accessToken })
}

const register = async (req, res) => {
    const { username, password, name, email, phone } = req.body
    if (!username || !password || !name || !email) {
        return res.status(400).json({ message: "username,password,name,email field are required" })
    }
    const duplicateUser = await User.findOne({ username: username }).lean()
    if (duplicateUser) {
        return res.status(409).json({ message: "Duplicate user" })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await User.create({ username, password: hashPassword, name, email, phone })
    if (!user) {
        return res.status(400).json({ message: "Bad request" })
    }
    return res.status(201).json({ message: `User ${user.name} created` })
}
module.exports = { login, register }