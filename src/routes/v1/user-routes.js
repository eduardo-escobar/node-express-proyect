const express = require('express');

const userController = require('../../controller/v1/user-controller');

const router = express.Router();

router.post('/create', userController.createUser);
router.post('/update', userController.updateUser);
router.post('/delete', userController.deleteUser);
router.get('/get-all', userController.getUser);

module.exports = router;
