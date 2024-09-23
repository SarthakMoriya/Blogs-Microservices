import express from 'express';
import {createComment, deleteComment} from '../controller/commentController.js'
const router=express.Router();

router.post('/comment',createComment)
router.delete('/comment/:commentId',deleteComment)
export default router;