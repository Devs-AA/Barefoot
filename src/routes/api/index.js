import { Router } from 'express';
import users from './users';
import requests from './requests';
import notifications from './notifications';

const router = Router();

router.use(users);
router.use(requests);
router.use(notifications);

export default router;
