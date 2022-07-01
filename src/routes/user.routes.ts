import express from 'express';

import userController from '../controllers/users';
import checkAuth from '../middleware/auth';


const router = express.Router();
router.get('/', checkAuth, async (req, res) => userController.getUsersController(req, res));
router.post('/signup', async (req, res) => userController.createUser(req, res));
router.post('/login', async (req, res) => userController.login(req, res))


export default router;