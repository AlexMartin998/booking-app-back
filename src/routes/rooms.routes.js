'use strict';

import { Router } from 'express';

import {
  createRoomRules,
  deleteRoomIdRules,
  protectWithJwt,
  roomIdRules,
  verifyAdmin,
} from '../middlewares/index.js';
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
} from '../controllers/index.js';

const router = Router();

router
  .route('/:hotelId')
  .post([protectWithJwt, verifyAdmin, ...createRoomRules()], createRoom)
  .get(getRooms);

router
  .route('/:id')
  .put([protectWithJwt, verifyAdmin, ...roomIdRules()], updateRoom)
  .get(roomIdRules(), getRoom);

router.delete(
  '/:id/:hotelId',
  [protectWithJwt, verifyAdmin, ...deleteRoomIdRules()],
  deleteRoom
);

export default router;
