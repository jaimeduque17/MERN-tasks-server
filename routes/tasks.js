const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Create a task
// api/tasks
router.post('/',
    auth,
    [
        check('name', 'The name is required').not().isEmpty()
    ],
    taskController.createTask
);

module.exports = router;
