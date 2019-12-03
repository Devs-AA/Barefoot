import { Router } from 'express';
import Controller from '../../controllers/chatController';
import { authorization } from '../../middlewares/auth/auth';
import { permit } from '../../middlewares/users';
import { roleIds } from '../../helpers/default';

const router = Router();


router.get('/chat', [authorization, permit([roleIds.manager, roleIds.requester,
  roleIds.travelAdmin, roleIds.superAdmin])],
Controller.start);

export default router;
