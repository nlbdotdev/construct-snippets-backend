const { isAlpha, isAlphanumeric, isStrongPassword } = require('validator')

// Validate format of user properties
function validateUserData(req, res, next) {

    console.log('Validate user data')
    console.log(req.body)

    const {username, password } = req.body
    let errObj = {}

    if (!isAlphanumeric(username)) {
        errObj.username = "Username should not have special characters."
    }

    if (!isStrongPassword(password, { minSymbols: 0 })) {
        errObj.password = "Password is invalid, must contain: at least 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number."
    }

    if (Object.keys(errObj).length > 0) {
        return res.status(500).json({ message: "error", error: errObj })
    } else {
        next()
    }
}

module.exports = {
    validateUserData,
}
