import express from 'express';
import {handleCreatePost, handleGetAllPosts, handleGetPostById, handleDeletePost, renderHome} from '../controllers/postControllers.js';

const router = express.Router();

router.get('/posts', handleGetAllPosts);       
router.get('/posts/:id', handleGetPostById);   
router.post('/posts', handleCreatePost);       
router.delete('/posts/:id', handleDeletePost);
router.get('/', renderHome);

export {router as posts};