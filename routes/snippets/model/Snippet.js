const mongoose = require('mongoose')

const snippetSchema = new mongoose.Schema({
    title: { type: String, unique: true, required: true },
    desc: { type: String, required: true },
    type: { type: String, required: true },
    clipboard: { type: String, required: true },
    tags: { type: Array },
    author: { type: mongoose.Schema.ObjectId, ref: "author", required: true }
},
    { timestamps: true }
)

module.exports = mongoose.model('snippet', snippetSchema)