import webPush from 'web-push';
import { Router } from 'express';
import notificationController from '../../controllers/notificationController';
import { authorization } from '../../middlewares/auth/auth';
import { checkEmailNotificationApproval } from '../../middlewares/notifications';
import { permit } from '../../middlewares/users';
import { roleIds } from '../../helpers/default';

const router = Router();

const { PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY } = process.env;

webPush.setVapidDetails('mailto:walesadeks@gmail.com', PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY);

router.post('/notifications/notify', async (req, res) => {
  const { subscription, message } = req.body;
  res.status(201).json({
    success: true
  });
  try {
    const payload = JSON.stringify({
      title: 'New Travel Request',
      body: message
    });
    await webPush.sendNotification(subscription, payload);
  } catch (error) {
    res.status().json({
      success: false,
      message: 'Could not send push notification'
    });
  }
});
router.patch('/notifications/unsubscribe',
  [authorization, permit([roleIds.manager, roleIds.requester])],
  checkEmailNotificationApproval,
  notificationController.unsubscribeEmailNotification);


export default router;
