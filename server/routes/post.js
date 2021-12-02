import { Router } from 'express'
import { createPost, getPosts, updatePost, deletePost, likePost, searchPosts } from '../controllers/post'
import { paginator, verify } from '../middlewares'
import Post from '../models/Post'

const router = Router()

router.post('/search', searchPosts)
router.get('/', paginator(Post), getPosts)
router.post('/create', verify, createPost)
router.patch('/:id', verify, updatePost)
router.delete('/:id', verify, deletePost)
router.patch('/:id/like', verify, likePost)

export default router