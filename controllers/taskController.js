const Task = require('../models/Task');
const Project = require('../models/Project');
const { validationResult } = require('express-validator');

// Create a new task
exports.createTask = async (req, res) => {

    // Check if there are error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    try {
        // Extract the project and verify is if exist
        const { project } = req.body;

        const existProject = await Project.findById(project);
        if (!existProject) {
            return res.status(404).json({ msg: 'Project not found' })
        }

        // Check if the current project belongs to the auth user
        if (existProject.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Create the task
        const task = new Task(req.body);
        await task.save();
        res.json({ task });

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
}

// Get tasks by project
exports.getTasks = async (req, res) => {
    try {
        // Extract the project and verify is if exist
        const { project } = req.body;

        const existProject = await Project.findById(project);
        if (!existProject) {
            return res.status(404).json({ msg: 'Project not found' })
        }

        // Check if the current project belongs to the auth user
        if (existProject.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Get tasks bt project
        const tasks = await Task.find({ project });
        res.json({ tasks });

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
}
