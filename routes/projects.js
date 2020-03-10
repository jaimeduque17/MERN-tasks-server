const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Create projects
// api/projects
router.post('/',
    auth,
    [
        check('name', 'The project name is required').not().isEmpty()
    ],
    projectController.createProject
);

// Get all projects
router.get('/',
    auth,
    projectController.getProjects
)

// Update project by ID
router.put('/:id',
    auth,
    [
        check('name', 'The project name is required').not().isEmpty()
    ],
    projectController.updateProject
);

module.exports = router;