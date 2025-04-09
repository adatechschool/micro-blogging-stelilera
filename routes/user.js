import express from 'express';
import { handleCreateUser, handleDeleteUser, handleGetAllUsers, handleUpdateUser } from '../controllers/userControllers.js';
//import { authCheck } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/users', handleGetAllUsers);
router.post('/register', handleCreateUser);
router.put('/update/:id',handleUpdateUser);
router.delete('/delete/:id',handleDeleteUser)
export {router as users};