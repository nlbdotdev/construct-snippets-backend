const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    snippets: [{ type: mongoose.Schema.ObjectId, ref: "snippet" }],
},
    { timestamps: true }
)

module.exports = mongoose.model('user', userSchema)