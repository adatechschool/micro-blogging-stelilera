import express from 'express';
import { handleCreatePost, handleGetAllPosts } from '../controllers/postControllers.js';

const router = express.Router();

router.get('/posts', handleGetAllPosts);
router.post('/posts', handleCreatePost)

export {router as posts};