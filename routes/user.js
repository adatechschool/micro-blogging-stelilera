import express from 'express';
import { handleGetAllUsers } from '../controllers/userControllers.js';

const router = express.Router();

router.get('/users', handleGetAllUsers);

export {router as users};