import {Router} from 'express'
import {  updateBlog } from '../controller/updateBlog.js';

const router=Router();

router.route('/:id').put(updateBlog)

export default router