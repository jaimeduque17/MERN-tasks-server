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
        const { project } = req.query;

        const existProject = await Project.findById(project);
        if (!existProject) {
            return res.status(404).json({ msg: 'Project not found' })
        }

        // Check if the current project belongs to the auth user
        if (existProject.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Get tasks by project
        const tasks = await Task.find({ project }).sort({ createdAt: -1 });
        res.json({ tasks });

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
}

// Update task
exports.updateTask = async (req, res) => {
    try {
        // Extract the project and verify is if exist
        const { project, name, state } = req.body;

        // If the task exist or not
        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ msg: 'No exist that task' });
        }

        // Extract project
        const existProject = await Project.findById(project);

        // Check if the current project belongs to the auth user
        if (existProject.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Create an object with the new information
        const newTask = {};

        if (name) {
            newTask.name = name;
        }

        if (state) {
            newTask.state = state;
        }

        // Save task
        task = await Task.findOneAndUpdate({ _id: req.params.id }, newTask, { new: true });

        res.json({ task });

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
}

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        // Extract the project and verify is if exist
        const { project } = req.query;

        // If the task exist or not
        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ msg: 'No exist that task' });
        }

        // Extract project
        const existProject = await Project.findById(project);

        // Check if the current project belongs to the auth user
        if (existProject.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Delete
        await Task.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Deleted task' });

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
}
