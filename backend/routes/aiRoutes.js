const express = require('express');
const router = express.Router();
const { categorizeTask, getTaskSuggestions } = require('../controllers/aiController');

router.post('/categorize', categorizeTask);
router.post('/suggest', getTaskSuggestions);


module.exports = router;
