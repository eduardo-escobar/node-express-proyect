const express = require('express');

const userController = require('../../controller/v1/user-controller');
const { isAuth, isValidHostname } = require('../../middlewares/auth');
const router = express.Router();

router.post('/create', userController.createUser);
router.post('/update', isValidHostname, isAuth, userController.updateUser);
router.post('/delete', userController.deleteUser);
router.post('/login', userController.login);
router.get('/get-all', userController.getUser);

module.exports = router;
