import { Router } from 'express';
import requestController from '../../controllers/requestController';
import {
  validateTripRequest, checkRequest, validateTripData, validateTripInput
} from '../../middlewares/trips';
import { validateUpdateRequest, checkRequestManager } from '../../middlewares/request';
import isLoggedIn from '../../middlewares/login';
import { permit } from '../../middlewares/users';
import { roleIds } from '../../helpers/default';

const router = Router();


router.post('/requests', [isLoggedIn, permit([roleIds.requester]), validateTripRequest, checkRequest], requestController.createRequest);
router.post('/requests/:requestId/trips', [isLoggedIn, permit([roleIds.requester]), validateTripInput, validateTripData], requestController.createRequestTrip);
router.patch('/requests/:requestId', [isLoggedIn, permit([roleIds.manager]), validateUpdateRequest, checkRequestManager], requestController.updateStatus);
router.put('/requests/:requestId', [], requestController.editRequest);

export default router;
