const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {

    // Check if there are errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract e-mail and password
    const { email, password } = req.body;

    try {
        // check that the registered user is unique
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'The user is already exist' });
        }

        // Create the new user
        user = new User(req.body);

        // Encrypt password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        // save user
        await user.save();

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
        res.status(400).send('There was an error');
    }
}