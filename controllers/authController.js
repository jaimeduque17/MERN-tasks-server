const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authUser = async (req, res) => {

    // Check if there are errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract email and password
    const { email, password } = req.body;

    try {
        // Check that it is a registered user
        let user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({msg: 'The user does not exist'});
        }

        // Check password
        const passOk = await bcryptjs.compare(password, user.password);
        if(!passOk) {
            return res.status(400).json({msg: 'Correct password'});
        }

        // Create and sign the JWT
        const payload = {
            user: {
                id: user.id
            }
        }

        // Sign JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600 // 3.600 seg = 1 hour
        }, (error, token) => {
            if(error) throw error;

            // Confirmation message
            res.json({ token });
        });

    } catch (error) {
        console.log(error);
    }
}