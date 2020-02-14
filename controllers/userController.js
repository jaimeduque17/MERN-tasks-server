const User = require('../models/User');

exports.createUser = async (req, res) => {
    try {
       let user;
       
       // Create the new user
       user = new User(req.body);

       // save user
       await user.save();

        // Confirmation message
        res.send('User created successfully');

    } catch (error) {
        console.log(error);
        res.status(400).send('There was an error');
    }
}