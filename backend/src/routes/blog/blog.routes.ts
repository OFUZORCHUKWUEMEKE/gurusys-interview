import express from 'express';
import authMiddleware from '../../middleware/auth.middleware';
import { createBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog } from '../../controllers/blog/blog';

const router = express.Router();

router.get('/', authMiddleware,  getAllBlogs);
router.get('/:id', authMiddleware, getBlogById);
router.post('/', authMiddleware,  createBlog);
router.put('/:id', authMiddleware, updateBlog);
router.delete('/:id', authMiddleware,  deleteBlog);

export default router;
