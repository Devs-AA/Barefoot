import { Router } from 'express';
import accommodationController from '../../controllers/accommodation';
import { authorization } from '../../middlewares/auth/auth';
import { permit } from '../../middlewares/users';
import { roleIds } from '../../helpers/default';
import {
  validateNewAccommodationInput, validateBookingInput, checkBookinginfo,
  checkAccommodationRating, validateRateAccommodationInput, checkIfUserCanLikeOrUnlikeAccommodation,
  validateLikeUnlike
} from '../../middlewares/accommodation';

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
 *      '201':
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/response'
 *      '400':
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 *      '401':
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 *      '404':
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 *      '500':
 *        description: Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 */
router.post('/accommodations', [authorization, permit([roleIds.travelAdmin, roleIds.traveTeamMember]),
  validateNewAccommodationInput], accommodationController.create);

/**
 * @swagger
 *
 * /accommodations/{accommodationId}:
 *  post:
 *    tags:
 *      - Accommodation
 *    summary: Books accommodation
 *    requestBody:
 *      required: true
 *      content: application/json
 *    responses:
 *      '201':
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/response'
 *      '400':
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 *      '401':
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 *      '404':
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 *      '500':
 *        description: Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 */
router.post('/accommodations/:accommodationId', [authorization, permit([roleIds.requester]),
  validateBookingInput, checkBookinginfo], accommodationController.book);

/**
 * @swagger
 *
 * /accommodations/{accommodationId}:
 *  post:
 *    tags:
 *      - Accommodation
 *    summary: Likes or Unlikes an accommodation
 *    requestBody:
 *      required: true
 *      content: application/json
 *    responses:
 *      '201':
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/response'
 *      '400':
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 *      '401':
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 *      '404':
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 *      '500':
 *        description: Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 */
router.patch('/accommodations/:accommodationId', [authorization, permit([roleIds.requester]),
  validateLikeUnlike, checkIfUserCanLikeOrUnlikeAccommodation],
accommodationController.likeAndUnlike);
/**
 * @swagger
 *
 * /accommodations/{accommodationId}/feedback:
 *  post:
 *    tags:
 *      - Accommodation
 *    summary: Rates an accommodation
 *    requestBody:
 *      required: true
 *      content: application/json
 *    responses:
 *      '201':
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/response'
 *      '400':
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 *      '401':
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 *      '404':
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
 *      '500':
 *        description: Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/errorResponse'
*/
router.post('/accommodations/:accommodationId/feedback', [authorization, permit([roleIds.requester]),
  validateRateAccommodationInput, checkAccommodationRating],
accommodationController.rate);

export default router;
