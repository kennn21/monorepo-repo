import { Router } from 'express';
import { UserController } from '../controller/user.controller';

const router = Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);

export default router;
