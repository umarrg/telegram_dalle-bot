const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Ai = new Schema({
    img: { type: String, },
    prompt: { type: String, },
    model: { type: String, },
    type: { type: String, },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});



module.exports = mongoose.model('tel_ai_bots', Ai);