/* eslint-disable import/extensions */
import express from 'express';
// eslint-disable-next-line import/extensions
import userController from '../../controller/v1/user-controller';
import { isAuth, isValidHostname, isAdmin } from '../../middlewares/auth';

const router = express.Router();

router.post('/create', userController.createUser);
router.post('/update', isValidHostname, isAuth, userController.updateUser);
router.post('/delete', isAuth, isAdmin, userController.deleteUser);
router.post('/login', userController.login);
router.get('/get-all', isAuth, isAdmin, userController.getUser);

export default router;
