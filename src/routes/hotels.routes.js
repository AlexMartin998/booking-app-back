'use strict';

import { Router } from 'express';

import {
  createHotelRules,
  hotelIdRules,
  protectWithJwt,
  verifyAdmin,
} from '../middlewares/index.js';
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
} from '../controllers/index.js';

const router = Router();

router
  .route('/')
  .post([protectWithJwt, verifyAdmin, ...createHotelRules()], createHotel)
  .get(getHotels);

router
  .route('/find/:id')
  .put([protectWithJwt, verifyAdmin, ...hotelIdRules()], updateHotel)
  .delete([protectWithJwt, verifyAdmin, ...hotelIdRules()], deleteHotel)
  .get(hotelIdRules(), getHotel);

router.get('/count-by-city', countByCity);
router.get('/count-by-type', countByType);
router.get('/room/:id', hotelIdRules(), getHotelRooms);

export default router;
