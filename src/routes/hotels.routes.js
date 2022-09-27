'use strict';

import { Router } from 'express';

import { protectWithJwt, verifyAdmin } from '../middlewares/index.js';
import {
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
} from '../controllers/index.js';

const router = Router();

router
  .route('/')
  .post([protectWithJwt, verifyAdmin], createHotel)
  .get(getHotels);

router
  .route('/:id')
  .put([protectWithJwt, verifyAdmin], updateHotel)
  .delete([protectWithJwt, verifyAdmin], deleteHotel)
  .get(getHotel);

export default router;
