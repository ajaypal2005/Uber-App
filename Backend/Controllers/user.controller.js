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