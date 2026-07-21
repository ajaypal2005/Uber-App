const userModel = require('../models/user.model');
const blacklisttokenModel = require('../models/blacklisttoken.model');
const captainModel = require('../models/captain.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Middleware function checking token and authenticating user
module.exports.authUSER = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    // Check if the token is present in the request
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if token is blacklisted
    try {
        const isBlacklisted = await blacklisttokenModel.findOne({ token: token });
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Token has been blacklisted' });
        }
    } catch (error) {
        console.error('Blacklist check error:', error);
    }

    // decode the token and find the user in the database
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        
        req.user = user;
        
        return next();
        
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized ' });
    }
}

// for logout route we can use this middleware to check if the token is valid and not blacklisted

module.exports.authcaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await blacklisttokenModel.findOne({ token: token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Token has been blacklisted' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        req.captain = captain;
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}