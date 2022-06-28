
import express from 'express';
import userController from './controllers/users';


const router = express.Router();
router.get('/', async (req, res) => userController.getUsersController(req, res))


export default router;