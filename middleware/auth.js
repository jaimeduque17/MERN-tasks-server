const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Read the token of the header
    const token = req.header('x-auth-token');

    // Check if there not have token
    if(!token) {
        return res.status(401).json({msg: 'There is no Token. Invalid permission'});
    }

    // Validate the token
    try {
        const encoded = jwt.verify(token, process.env.SECRET);
        req.user = encoded.user;
        next();
    } catch (error) {
        res.status(401).json({msg: 'Invalid token'});
    }
}