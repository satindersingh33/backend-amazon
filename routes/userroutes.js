const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');

router.post("/signup", userController.signup);
router.post("/register", userController.registerUser);
router.put('/users/:userId/password', userController.updatePassword);

module.exports = router;