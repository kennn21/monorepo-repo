import { Router } from 'express';
import { UserController } from '../controller/user.controller';
import { firebaseAuth } from '../middleware/firebaseAuth';

const router = Router();

router.use(firebaseAuth);

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);

export default router;
