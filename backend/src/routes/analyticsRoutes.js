const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const authMiddleware = require('../middlewares/authMiddleware'); // Optional for authentication


router.get('/', authMiddleware, analyticsController.getCompletionStats);


module.exports = router;
