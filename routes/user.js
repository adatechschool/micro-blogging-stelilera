import express from 'express';
import { handleCreateUser, handleGetAllUsers } from '../controllers/userControllers.js';
//import { authCheck } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/users', handleGetAllUsers);
router.post('/register', handleCreateUser)

export {router as users};