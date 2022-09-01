const Snippet = require("../model/Snippet")

const createSnippet = async (req, res) => {

    console.log('Create Snippet')

    try {

        // Create user with body params and hashed password
        // const { firstName, lastName, username, email, password } = req.body

        console.log(req.body)

        let newSnippet = new Snippet({...req.body})

        let savedSnippet = await newSnippet.save()

        console.log('savedSnippet:',savedSnippet)
        
        // let newUser = new User({
        //     firstName: firstName,
        //     lastName: lastName,
        //     username: username,
        //     email: email,
        //     password: hashedPassword,


        // })
        // let savedUser = await newUser.save()

        // Generate a token on sucesful login

        console.log('snippet created?')
        res.status(200).json({ message: "success", payload: 'test' })
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

const getSnippet = async (req, res) => {
}

module.exports = {
    createSnippet,
    updateSnippet,
    getSnippet,
}