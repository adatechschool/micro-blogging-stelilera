import express from 'express';
import {handleCreatePost, handleGetAllPosts, handleGetPostById, handleDeletePost} from '../controllers/postControllers.js';

const router = express.Router();

router.get('/posts', handleGetAllPosts);       
router.get('/posts/:id', handleGetPostById);   
router.post('/posts', handleCreatePost);       
router.delete('/posts/:id', handleDeletePost);

export {router as posts};