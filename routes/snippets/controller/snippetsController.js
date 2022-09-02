const Snippet = require("../model/Snippet")
const User = require("../../users/model/User")
const { getUserFromToken } = require("../../users/utils/userFunctions")

const createSnippet = async (req, res) => {

    console.log('Create Snippet')

    try {

        // Get current user and associate with new snippet
        const foundUser = await getUserFromToken(res.locals.decodedToken)
        const author = foundUser.id
        // Create new snippet
        const newSnippet = new Snippet({ ...req.body, author })
        const savedSnippet = await newSnippet.save()
        // Add new snippet to user's collection
        foundUser.snippets.push(savedSnippet.id)
        await foundUser.save()
        // console.log('snippet owner:', foundUser)

        res.status(200).json({ message: "success", payload: savedSnippet })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "error", error: error })
    }
}

const updateSnippet = async (req, res) => {
    // try {
    //     // Fetch token from response locals
    //     const decodedToken = res.locals.decodedToken

    //     // Hash password and append to request body
    //     let hashedPassword = await hashPassword(req.body.password)
    //     req.body.password = hashedPassword

    //     // Find user via JWT & Email and update
    //     const updatedUser = await User.findOneAndUpdate(
    //         { email: decodedToken.email },
    //         req.body,
    //         { new: true })
    //     res.status(200).json({ message: "Updated User", payload: updatedUser })

    // } catch (error) {
    //     res.status(500).json({ error: errorHandler(error) })
    // }
}

const getAllSnippets = async (req, res) => {
    try {
        const allSnippets = await Snippet.find()
        res.status(200).json({ message: "success", payload: allSnippets })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "error", error: error })
    }
}

const getMySnippets = async (req, res) => {
    try {
         // Get current user and associate with new snippet
         const user = await getUserFromToken(res.locals.decodedToken)

        const mySnippets = await Snippet.find({author: user.id })
        res.status(200).json({ message: "success", payload: mySnippets })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "error", error: error })
    }
}

const getSnippet = async (req, res) => {
}

module.exports = {
    createSnippet,
    updateSnippet,
    getAllSnippets,
    getMySnippets,
    getSnippet,
}