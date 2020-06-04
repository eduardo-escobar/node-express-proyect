const express = require('express');

const userController = require('../../controller/v1/user-controller');
const { isAuth, isValidHostname, isAdmin } = require('../../middlewares/auth');
const router = express.Router();

router.post('/create', userController.createUser);
router.post('/update', isValidHostname, isAuth, userController.updateUser);
router.post('/delete', isAuth, isAdmin, userController.deleteUser);
router.post('/login', userController.login);
router.get('/get-all',isAuth, isAdmin, userController.getUser);

module.exports = router;
