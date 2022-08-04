const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../model/User")
const { userErrorHandler: errorHandler } = require('../utils/userErrorHandler')
const { hashPassword, getUserFromToken } = require("../utils/userFunctions")


// Remove sensitive data from user
const cleanUser = (user) => {
    return {
        id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    }
}

// Generate jwt token for user  sessions
const getToken = (userId) => {
    const token = jwt.sign(
        { userId },
        process.env.SECRET_KEY,
        { expiresIn: process.env.JWT_LIFETIME }
    )

    return token
}

// Create new user
const createUser = async (req, res) => {
    try {

        // Create user with body params and hashed password
        const { firstName, lastName, username, email, password } = req.body
        let hashedPassword = await hashPassword(password)
        let newUser = new User({
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: hashedPassword,
        })
        let savedUser = await newUser.save()

        // Generate a token on sucesful login
        const jwtToken = getToken(savedUser._id)
        res.cookie('session_token', jwtToken)
        res.status(200).json({ message: "success", payload: cleanUser(savedUser) })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "error", error: errorHandler(error) })
    }
}

// Login with email and password
const userLogin = async (req, res) => {
    try {

        // Get user by email
        const { email, password } = req.body
        const foundUser = await User.findOne({ email: email })
        if (foundUser === null) throw { message: "No user found for this email/password", type: "nomatch" }

        // Validate password
        const comparedPassword = await bcrypt.compare(password, foundUser.password)
        if (!comparedPassword) throw { message: "No user found for this email/password", type: "nomatch" }

        // Generate a token on sucesful login
        const jwtToken = getToken(foundUser._id)
        res.cookie('session_token', jwtToken)
        res.status(200).json({ message: "success", payload: cleanUser(foundUser) })

    } catch (error) {
        res.status(500).json({ error: error.message, type: error.type })
    }
}

// Verify session
const authenticateUser = async (req, res) => {
    try {
        const foundUser = await getUserFromToken(res.locals.decodedToken)
        res.status(200).json({ message: "Session valid", payload: true });
    } catch (error) {
        res.status(500).json({ error: errorHandler(error) });
    }
}

// Get current user from bearer token
const getCurrentUser = async (req, res) => {
    try {
        const foundUser = await getUserFromToken(res.locals.decodedToken)
        res.status(200).json({ message: "Current user", payload: cleanUser(foundUser) });
    } catch (error) {
        res.status(500).json({ error: errorHandler(error) });
    }
}

// Update current user with bearer token and req body
const updateProfile = async (req, res) => {
    try {
        // Fetch token from response locals
        const decodedToken = res.locals.decodedToken

        // Hash password and append to request body
        let hashedPassword = await hashPassword(req.body.password)
        req.body.password = hashedPassword

        // Find user via JWT & Email and update
        const updatedUser = await User.findOneAndUpdate(
            { email: decodedToken.email },
            req.body,
            { new: true })
        res.status(200).json({ message: "Updated User", payload: updatedUser })

    } catch (error) {
        res.status(500).json({ error: errorHandler(error) })
    }
}

module.exports = {
    createUser,
    userLogin,
    updateProfile,
    getCurrentUser,
    authenticateUser,
}