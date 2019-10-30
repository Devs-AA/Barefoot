import { Router } from 'express';
import requestController from '../../controllers/requestController';
import commentController from '../../controllers/commentController';
import {
  validateTripRequest, checkRequest, validateTripData, validateTripInput
} from '../../middlewares/request/trips';
import {
  validateUpdateRequest, checkRequestManager, validateEditRequest, checkRequestOwnerAndConflict
} from '../../middlewares/request';
import { validateCommentInput, validateCommentRequest } from '../../middlewares/comment';
import { authorization } from '../../middlewares/auth/auth';
import { permit } from '../../middlewares/users';
import { roleIds } from '../../helpers/default';

const router = Router();


/**
 * @swagger
 *
 * /requests:
 *  post:
 *    tags:
 *      - Requests
 *    summary: It create new request
 *    security:
 *       - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/requestBody'
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
router.post('/requests', [authorization, permit([roleIds.requester]),

  validateTripRequest, checkRequest], requestController.createRequest);

/**
 * @swagger
 *
 * /requests/{requestId}/trips:
 *  post:
 *    tags:
 *      - Requests
 *    summary: It create new request
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *     - name: requestId
 *       in: path
 *       description: id of the request
 *       schema:
 *        type: string
 *    requestBody:
 *      required: true
 *      content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/tripBody'
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
router.post('/requests/:requestId/trips', [authorization, permit([roleIds.requester]),

  validateTripInput, validateTripData], requestController.createRequestTrip);

/**
 * @swagger
 *
 * /requests/{requestId}:
 *  patch:
 *    tags:
 *      - Requests
 *    summary: It create new request
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *     - name: requestId
 *       in: path
 *       description: id of the request
 *       schema:
 *        type: string
 *    requestBody:
 *      required: false
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: string
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

router.patch('/requests/:requestId', [authorization, permit([roleIds.manager]),

  validateUpdateRequest, checkRequestManager], requestController.updateStatus);

/**
 * @swagger
 *
 * /requests/{requestId}:
 *  put:
 *    tags:
 *      - Requests
 *    summary: It update a request for that id
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *     - name: requestId
 *       in: path
 *       description: id of the request
 *       schema:
 *        type: string
 *    requestBody:
 *      required: true
 *      content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/requestBody'
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

router.put('/requests/:requestId', [authorization, permit([roleIds.requester]),

  validateEditRequest, checkRequestOwnerAndConflict], requestController.editRequest);

/**
 * @swagger
 *
 * /requests/{requestId}/comments:
 *  post:
 *    tags:
 *      - Requests
 *    summary: create a comment
 *    security:
 *       - bearerAuth: []
 *    parameters:
 *     - name: requestId
 *       in: path
 *       description: id of the request
 *       schema:
 *        type: string
 *    requestBody:
 *      required: false
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *              requesterId:
 *                type: string
 *              ownerId:
 *                type: string
 *    responses:
 *      '200':
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/response'
 *      '400':
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 *      '500':
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 */

router.post('/requests/:requestId/comments', [authorization, permit([roleIds.requester, roleIds.manager]),

  validateCommentInput, validateCommentRequest], commentController.create);

/**
 * @swagger
 *
 *    /requests:
 *    get:
 *     tags:
 *       - Requests
 *     summary: Gets and display user requests
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/response'
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/errorResponse'
 *       '500':
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/errorResponse'
 */

router.get('/requests', [authorization, permit([roleIds.requester])], requestController.findAll);

export default router;
