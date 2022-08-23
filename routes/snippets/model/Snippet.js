const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    title: { type: String, unique: true },
    desc: { type: String },
    type: { type: String },
    clipboard: { type: String},
    tags: { type: Array },
},
    { timestamps: true }
)

module.exports = mongoose.model('snippet', userSchema)