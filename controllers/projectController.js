const Project = require('../models/Project');

exports.createProject = async (req, res) => {
    try {
        // Create a new project
        const project = new Project(req.body);
        project.save();
        res.json(project);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');        
    }
}