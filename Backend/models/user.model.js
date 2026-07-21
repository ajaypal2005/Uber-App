const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long']
        },
        // Define the last name field
        lastname: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters long']
        },
    },

    // Define the email field with validation
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long'],
    },

    // Define the password field with validation
    password: {
        type: String,
        required: true,
        select: false,
    },

    // Define the socketId field
    socketId: {
        type: String,

    }

})



// Define a method to generate a JWT token for the user
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}


// Define a method to compare a given password with the hashed password stored in the database
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}


// Hash a password before saving it to the database
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}


const userModel = mongoose.model('User', userSchema);

module.exports = userModel;