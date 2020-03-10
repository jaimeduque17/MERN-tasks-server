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

// Update a project
exports.updateProject = async (req, res) => {

    // Check if there are error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract the project information
    const { name } = req.body;
    const newProject = {};

    if (name) {
        newProject.name = name;
    }

    try {

        //Check the ID
        let project = await Project.findById(req.params.id);

        // If the project exist or not
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        // Check the project creator
        if (project.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Update
        project = await Project.findByIdAndUpdate({ _id: req.params.id }, { $set: newProject }, { new: true });

        res.json({ project });

    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
}

// Delete project
exports.deleteProject = async (req, res) => {
    try {
        //Check the ID
        let project = await Project.findById(req.params.id);

        // If the project exist or not
        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        // Check the project creator
        if (project.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Delete the project
        await Project.findOneAndRemove({ _id: req.params.id });
        res.json({msg: 'Project removed'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
}