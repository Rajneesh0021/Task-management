const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const checkAdmin=require('../middlewares/checkAdmin')
const authMiddleware = require('../middlewares/authMiddleware'); 
router.get('/',authMiddleware,checkAdmin,  adminController.getAllUsers);
router.get('/:userId',authMiddleware,checkAdmin,  adminController.getUserWithTasks);

module.exports = router;
