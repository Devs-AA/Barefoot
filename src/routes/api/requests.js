import { Router } from 'express';
import requestController from '../../controllers/requestController';
import {
  validateTripRequest, checkRequest, validateTripData, validateTripInput
} from '../../middlewares/trips';
import { authorization } from '../../middlewares/auth/auth';
import { permit } from '../../middlewares/users';
import { roleIds } from '../../helpers/default';
import updateRequest from '../../helpers/tripRequest';

const router = Router();


router.post('/requests', [authorization, permit([roleIds.requester]), validateTripRequest, checkRequest], requestController.createRequest);
router.post('/requests/:requestId/trips', [authorization, permit([roleIds.requester]), validateTripInput, validateTripData], requestController.createRequestTrip);
router.patch('/requests/:requestId', async (req, res) => {
  const { status } = req.body;
  const { requestId } = req.params;
  const updatedRequest = await updateRequest(status, requestId);
  res.status(200).send(updatedRequest);
});

export default router;
