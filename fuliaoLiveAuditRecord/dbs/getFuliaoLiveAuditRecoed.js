const mongoose = require('mongoose');

module.exports = mongoose.model('fuliaoLiveAuditRecord', new mongoose.Schema({
    name: String,
    time: Number,
    action: String,
    keeptime: Number
}));