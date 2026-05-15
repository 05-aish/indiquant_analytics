const express = require('express');
const router = express.Router();
const { validateSubmission } = require('../middleware/validate');
const { createSubmission } = require('../controller/submissionController');

//post
router.post('/', validateSubmission, createSubmission);
module.exports = router;