import express from 'express';
import { handleCreateUser, handleGetAllUsers, handleLoginUser } from '../controllers/userControllers.js';
//import { authCheck } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/users', handleGetAllUsers);
router.post('/register', handleCreateUser);
router.post('/login', handleLoginUser);

export {router as users};