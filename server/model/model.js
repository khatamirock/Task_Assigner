const mongoose = require('mongoose');

// Define User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: String,
    status: String
});


userSchema.pre("save",async function(next){
    console.log('pre save hook \n\n\n\n\||||||||||| saved vaiii|||||||||\n\n\n');
    next();
});

//add a functionality to check if a user is deleted currently
userSchema.post("remove",async function(next){
    console.log('post remove hook \n\n\n\n\||||||||||| saved vaiii|||||||||\n\n\n');
    next();
});



// Define Post schema
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Userdb'
    }
});

// Define User model
const Userdb = mongoose.model('Userdb', userSchema);

// Define Post model
const Postdb = mongoose.model('Postdb', postSchema);

module.exports = { Userdb, Postdb };
