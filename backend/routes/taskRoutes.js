// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

router.use(checkAuth); 

router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
