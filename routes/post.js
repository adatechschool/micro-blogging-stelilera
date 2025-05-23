import express from 'express';
import {handleCreatePost, handleGetAllPosts, handleGetPostById, handleDeletePost, renderHome} from '../controllers/postControllers.js';
import loginCheck from '../middleware/loginMiddleware.js';

const router = express.Router();

router.get('/posts', handleGetAllPosts);       
router.get('/posts/:id', handleGetPostById);   
router.post('/posts', handleCreatePost);       
router.delete('/posts/:id', handleDeletePost);
router.get('/', loginCheck, renderHome);

export {router as posts};