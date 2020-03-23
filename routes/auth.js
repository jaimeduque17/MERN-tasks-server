// Routes to auth users
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Log in
// api/auth
router.post('/',
    [
        check('email', 'Add a valid email').isEmail(),
        check('password', 'The password must be at least 6 characters').isLength({ min: 6 })
    ],
    authController.authUser
);

// Get the authenticated user
router.get('/',
    auth,
    authController.userAuthenticated
);


module.exports = router;