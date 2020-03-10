const Project = require('../models/Project');
const { validationResult } = require('express-validator');

exports.createProject = async (req, res) => {

    // Check if there are error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Create a new project
        const project = new Project(req.body);

        // Save creator project by JWT
        project.creator = req.user.id;

        // Save the project
        project.save();
        res.json(project);

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
}

// Get all projects of the current user
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ creator: req.user.id }).sort({ creator: -1 });
        res.json({ projects });
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
}