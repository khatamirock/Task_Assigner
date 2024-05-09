const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    gender : String,
    status : String
})



const Userdb = mongoose.model('userdb', schema);

// Define Posts schema
const postSchema = new mongoose.Schema({
    title: { type: String },
    content: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Userdb' } // Reference to User model
});



// Define User model

// Define Posts model
const Postdb = mongoose.model('Post', postSchema);

module.exports = { Userdb, Postdb };




 