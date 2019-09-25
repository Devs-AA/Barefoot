import { Router } from 'express';
import users from './users';
import requests from './requests';

const router = Router();

router.use(users);
router.use(requests);

export default router;
