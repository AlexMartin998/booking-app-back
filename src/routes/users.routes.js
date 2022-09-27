'use strict';

import { Router } from 'express';

import {
  isAdminOrSameUser,
  protectWithJwt,
  userIdRules,
  verifyAdmin,
} from '../middlewares/index.js';
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../controllers/index.js';

const router = Router();

// Protect all routes
router.use(protectWithJwt);

router.get('/', verifyAdmin, getUsers);

router
  .route('/:id')
  .put([...userIdRules(), isAdminOrSameUser], updateUser)
  .delete([...userIdRules(), isAdminOrSameUser], deleteUser)
  .get([...userIdRules(), isAdminOrSameUser], getUser);

export default router;
