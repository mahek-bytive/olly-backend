import { Router } from 'express';
// import Validator from '../../../middlewares/validators.middleware';
import { CommentController } from '../../controllers/comment';
// import { contentSchema} from '../../../validators/comment.validators';

const router = Router();

router.route('/').post(
  // Validator.body(contentSchema),
  CommentController.generateComment);

export default router;

