const mongoose = require('mongoose')

module.exports = mongoose.model('resumeLeavedMessage', new mongoose.Schema({
    name: String,
    message: String,
    email: String,
    time: Number
}))