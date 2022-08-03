const jwt = require('jsonwebtoken')

// Validate token before moving on
const jwtMiddleware = async (req, res, next) => {

    console.log('jwtMiddleware')

    try {

        // Get token from cookies
        const { session_token: sessionToken } = req.cookies;
        console.log('sessionToken:', sessionToken);

        if (sessionToken) {
            // Verify token with environment secret key
            const decodedToken = jwt.verify(sessionToken, process.env.SECRET_KEY)
            res.locals.decodedToken = decodedToken
            next()
        } else {
            throw { message: "Token Error" }
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    jwtMiddleware,
}