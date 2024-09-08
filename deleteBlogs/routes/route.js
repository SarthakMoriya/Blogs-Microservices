import {Router} from 'express'
import { deleteBlog } from '../controller/deleteBlog.js';

const router=Router();

router.route('/:id').delete(deleteBlog)
export default router;