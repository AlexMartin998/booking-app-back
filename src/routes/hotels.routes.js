'use strict';

import { Router } from 'express';
import {
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
} from '../controllers/index.js';

const router = Router();

router.route('/').post(createHotel).get(getHotels);

router.route('/:id').put(updateHotel).delete(deleteHotel).get(getHotel);

export default router;
