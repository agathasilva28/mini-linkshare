const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const verifyToken = require('../middlewares/authMiddleware');

router.post('/', verifyToken, pageController.createOrUpdatePage);
router.get('/settings', verifyToken, pageController.getPagebyUserId);
router.get('/:username', pageController.getPagebyUsername);

module.exports = router;