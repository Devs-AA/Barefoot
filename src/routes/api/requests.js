import { Router } from 'express';
import requestController from '../../controllers/requestController';
import commentController from '../../controllers/commentController';
import {
  validateTripRequest, checkRequest, validateTripData, validateTripInput
} from '../../middlewares/trips';
import { validateUpdateRequest, checkRequestManager } from '../../middlewares/request';
import { validateCommentInput, validateCommentRequest } from '../../middlewares/comment';
import { authorization } from '../../middlewares/auth/auth';
import { permit } from '../../middlewares/users';
import { roleIds } from '../../helpers/default';

const router = Router();


router.post('/requests', [authorization, permit([roleIds.requester]),

  validateTripRequest, checkRequest], requestController.createRequest);

router.post('/requests/:requestId/trips', [authorization, permit([roleIds.requester]),

  validateTripInput, validateTripData], requestController.createRequestTrip);

router.patch('/requests/:requestId', [authorization, permit([roleIds.manager]),

  validateUpdateRequest, checkRequestManager], requestController.updateStatus);

router.post('/requests/:requestId/comments', [authorization, permit([roleIds.requester, roleIds.manager]),
  validateCommentInput, validateCommentRequest], commentController.create);

export default router;
