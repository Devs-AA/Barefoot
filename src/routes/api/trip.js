import { Router } from 'express';
import Controller from '../../controllers/tripController';
import { authorization } from '../../middlewares/auth/auth';
import { permit } from '../../middlewares/users';
import { roleIds } from '../../helpers/default';
import { validateTripStatsInput, checkManager } from '../../middlewares/request/trips';


const router = Router();

router.get('/trips/stats', [authorization, permit([roleIds.requester, roleIds.manager]),
  validateTripStatsInput, checkManager],
Controller.getTripStats);


export default router;
