const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../Controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Define the route for user registration with validation checks
router.post('/register', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('fullname.firstname').optional({ checkFalsy: true }).isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('firstname').optional({ checkFalsy: true }).isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    userController.registerUser
);

router.post('/login',[
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    userController.loginUser
)

router.get('/profile',authMiddleware.authUSER,userController.getUserProfile);

router.get('/logout',authMiddleware.authUSER,userController.logoutUser);

module.exports = router;