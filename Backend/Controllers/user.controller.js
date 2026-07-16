const userModel = require('../db/models/user.model');
const userservice = require('../services/user.service');
const { validationResult } = require('express-validator');


// Register a new user
module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
       
    // Extract user data from the request body
    const { fullname, email, password } = req.body;

    // store pasword in hashed format in the database
    const hashedPassword = await userModel.hashPassword(password);

    const user = await userservice.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

        const token = user.generateAuthToken();
        res.status(201).json({token,user });
}

// Login a user
module.exports.loginUser = async (req, res, next) => {
    // Validate the request body for email and password
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract email and password from the request body
    const { email, password } = req.body;
    // Find user existing in the database by email and include the password field for comparison
    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate an authentication token
    const token = user.generateAuthToken();
    res.status(200).json({ token, user });
}