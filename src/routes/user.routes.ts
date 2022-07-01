import express from 'express';
import userController from '../controllers/users';


const router = express.Router();
router.get('/', async (req, res) => userController.getUsersController(req, res));
router.post('/signup', async (req, res) => userController.createUser(req, res));



export default router;