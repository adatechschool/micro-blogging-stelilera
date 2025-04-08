import express from 'express';
import { handleCreateUser, handleGetAllUsers } from '../controllers/userControllers.js';

const router = express.Router();

router.get('/users', handleGetAllUsers);
router.post('/users', handleCreateUser)

export {router as users};