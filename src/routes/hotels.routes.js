'use strict';

import { Router } from 'express';

import {
  createHotelRules,
  hotelIdRules,
  protectWithJwt,
  verifyAdmin,
} from '../middlewares/index.js';
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
  .post([protectWithJwt, verifyAdmin, ...createHotelRules()], createHotel)
  .get(getHotels);

router
  .route('/:id')
  .put([protectWithJwt, verifyAdmin, ...hotelIdRules()], updateHotel)
  .delete([protectWithJwt, verifyAdmin, ...hotelIdRules()], deleteHotel)
  .get(hotelIdRules(), getHotel);

export default router;
