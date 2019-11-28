import { Router } from 'express';
import notificationController from '../../controllers/notificationController';
import { authorization } from '../../middlewares/auth/auth';
import { checkEmailNotificationApproval } from '../../middlewares/notifications';
import { permit } from '../../middlewares/users';
import { roleIds } from '../../helpers/default';

const router = Router();

/**
 * @swagger
 *
 * /notifications/notify:
 *  post:
 *    tags:
 *      - Notification
 *    summary: Sends notification to front end
 *    requestBody:
 *      required: true
 *      content: application/json
 *    responses:
 *      '200':
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/response'
 */
router.post('/notifications/notify', async (req, res) => {
  try {
    await notificationController.notify(req.body);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Could not send push notification'
    });
  }
});

/**
 * @swagger
 *
 * /notifications:
 *  post:
 *    tags:
 *      - Notification
 *    summary: Reads all notifications of a user
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *      required: false
 *      content: application/json
 *    responses:
 *      '200':
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/response'
 *      '401':
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 *      '500':
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 */
router.patch('/notifications', [authorization, permit([roleIds.requester, roleIds.manager])], notificationController.readAll);

/**
 * @swagger
 *
 * /notifications/unsubscribe:
 *  post:
 *    tags:
 *      - Notification
 *    summary: Unsubsrcibes a user from email notification
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *      required: false
 *      content: application/json
 *    responses:
 *      '200':
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/response'
 *      '401':
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 *      '500':
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 */
router.patch('/notifications/unsubscribe',
  [authorization, permit([roleIds.manager, roleIds.requester])],
  checkEmailNotificationApproval,
  notificationController.unsubscribeEmailNotification);


export default router;
