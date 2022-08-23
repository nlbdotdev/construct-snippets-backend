const mongoose = require('mongoose')

const snippetSchema = new mongoose.Schema({
    title: { type: String, unique: true },
    desc: { type: String },
    type: { type: String },
    clipboard: { type: String},
    tags: { type: Array },
},
    { timestamps: true }
)

module.exports = mongoose.model('snippet', snippetSchema)