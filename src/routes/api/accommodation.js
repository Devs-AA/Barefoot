import { Router } from 'express';
import accommodationController from '../../controllers/accommodation';
// import { authorization } from '../../middlewares/auth/auth';
// import { checkEmailNotificationApproval } from '../../middlewares/notifications';
// import { permit } from '../../middlewares/users';
// import { roleIds } from '../../helpers/default';

const router = Router();

/**
 * @swagger
 *
 * /accommodations:
 *  post:
 *    tags:
 *      - Accommodation
 *    summary: Creates new accommodation
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
router.post('/accommodations', accommodationController.create);

export default router;
