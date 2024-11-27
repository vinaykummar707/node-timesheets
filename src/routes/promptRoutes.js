const express = require('express');
const router = express.Router();
const promptController = require('../controllers/promptController');

router.post('/process-prompt', promptController.processPrompt);

module.exports = router;