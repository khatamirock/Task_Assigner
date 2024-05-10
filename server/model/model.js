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


userSchema.post("save", async function(doc, next) {
    // Access the _id of the saved document
    const userId = doc._id;

    // Log the userId
    console.log('\n\n\n\n\||||||||||| saved userId:', userId, '|||||||||\n\n\n');
    
    next();
});

// read this 
// 663de489a5e7490f8c681e55
// https://mongoosejs.com/docs/middleware.html#pre
//add a functionality to check if a user is deleted currently
userSchema.pre('deleteOne', async function(next) {
    const userId = this._conditions._id;
    console.log('deleted \n\n\n\n\||||||||||| delete userId:', userId, '|||||||||\n\n\n');
    await Postdb.deleteMany({ user: userId });
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
