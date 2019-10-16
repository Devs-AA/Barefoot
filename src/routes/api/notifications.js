import { Router } from 'express';
import notificationController from '../../controllers/notificationController';
import { authorization } from '../../middlewares/auth/auth';
import { checkEmailNotificationApproval } from '../../middlewares/notifications';
import { permit } from '../../middlewares/users';
import { roleIds } from '../../helpers/default';

const router = Router();

router.get('/notify', (req, res) => res.send('Here'));
router.patch('/notifications/unsubscribe',
  [authorization, permit([roleIds.manager, roleIds.requester])],
  checkEmailNotificationApproval,
  notificationController.unsubscribeEmailNotification);


export default router;
