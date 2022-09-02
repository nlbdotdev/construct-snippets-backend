const User = require('../model/User')
const bcrypt = require("bcryptjs");

// Hash argument using bcrypt
const hashPassword = async (password) => {
    let salt = await bcrypt.genSalt(parseInt(process.env.BCRYPTJS_SALTROUNDS))
    let hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

// Fetch user via id in JWT
const getUserFromToken = async (decodedToken) => {
    return await User.findById(decodedToken.userId)
}

module.exports = {
    getUserFromToken,
    hashPassword,
}