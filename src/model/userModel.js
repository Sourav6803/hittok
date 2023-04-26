const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    
        fname: {
            type: String,
        },
        lname: {
            type: String,
        },
        email: {
            type: String,
        },
        
        phone: {
            type: String,
        },

        password: {
            type: String,
        },
    }, { timestamps: true })

   

module.exports = mongoose.model('User', userSchema)