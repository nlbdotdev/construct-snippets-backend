const mongoose = require('mongoose')

const snippetSchema = new mongoose.Schema({
    title: { type: String, unique: true, required: true },
    desc: { type: String, required: true },
    type: { type: String, required: true },
    clipboard: { type: String, required: true},
    tags: { type: Array },
},
    { timestamps: true }
)

module.exports = mongoose.model('snippet', snippetSchema)