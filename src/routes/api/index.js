import { Router } from 'express';
import users from './users';
import requests from './requests';
import notifications from './notifications';
import accommodation from './accommodation';

const router = Router();

router.use(users);
router.use(requests);
router.use(notifications);
router.use(accommodation);

export default router;
