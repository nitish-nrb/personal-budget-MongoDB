const mongoose = require('mongoose')

const budgetSchema = new mongoose.Schema({
    title: { type: String, required: true },
    budget: { type: Number, required: true },
    color: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^#([0-9a-f]{6})$/i.test(v);
            },
            message: 'Invalid color format, must be a 6-digit hexadecimal code (e.g., #ED4523)'

        },
        required:true,
        trim:true,
        uppercase:true
    }
},{collection:'budget'})

module.exports = mongoose.model('budget',budgetSchema)