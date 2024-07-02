import { Router } from 'express';
import {
  addComment, addPost, getPost, getPosts,
} from './controllers/post.controller';

const router: Router = Router();

router.get('/', getPosts);
router.post('/', addPost);
router.get('/:id', getPost);
router.post('/:id/comments', addComment);

export default router;
