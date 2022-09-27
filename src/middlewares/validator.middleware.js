'use strict';

import { body, param, validationResult } from 'express-validator';
import { idExistInDB, isAlreadyRegistered } from '../helpers/index.js';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ ok: false, errors: errors.mapped() });

  return next();
};

// Auth
export const emailPassRules = () => [
  body('email', 'Invalid email!').isEmail(),
  body('password', 'Password must be longer than 6 characters!').isLength({
    min: 6,
  }),
];

export const signUpRules = () => [
  body('username', 'Invalid username!').notEmpty(),
  ...emailPassRules(),
  validate,

  body('email').custom(email => isAlreadyRegistered(email, 'user')),
  body('username').custom(username =>
    isAlreadyRegistered(username, 'username')
  ),
  validate,
];

export const loginRules = () => [...emailPassRules(), validate];

// User
export const userIdRules = () => [
  param('id', 'Invalid ID!').isMongoId(),
  validate,

  param('id').custom(id => idExistInDB(id, 'user')),
  validate,
];

// Hotel
export const createHotelRules = () => [
  body('name', 'Name is required!').not().isEmpty(),
  body('type', 'Type is required!').not().isEmpty(),
  body('city', 'City is required!').not().isEmpty(),
  body('address', 'Address is required!').not().isEmpty(),
  body('distance', 'Distance date is required!').not().isEmpty(),
  body('title', 'Title date is required!').not().isEmpty(),
  body('description', 'Description date is required!').not().isEmpty(),
  body('cheapestPrice', 'Cheapest price date is required!').not().isEmpty(),
  validate,
];

export const hotelIdRules = () => [
  param('id', 'Invalid ID!').isMongoId(),
  validate,

  param('id').custom(id => idExistInDB(id, 'hotel')),
  validate,
];

// Room
export const createRoomRules = () => [
  param('hotelId', 'Invalid ID!').isMongoId(),
  validate,

  param('hotelId').custom(hotelId => idExistInDB(hotelId, 'hotel')),
  validate,

  body('title', 'Title date is required!').not().isEmpty(),
  body('price', 'Price is required!').not().isEmpty(),
  body('maxPeople', 'Max People is required!').not().isEmpty(),
  body('description', 'Description date is required!').not().isEmpty(),
  body('roomNumbers', 'Room Numbers are required!').not().isEmpty(),

  validate,
];

export const roomIdRules = () => [
  param('id', 'Invalid ID!').isMongoId(),
  validate,

  param('id').custom(id => idExistInDB(id, 'room')),
  validate,
];

export const deleteRoomIdRules = () => [
  param('id', 'Invalid ID!').isMongoId(),
  validate,
  param('id').custom(id => idExistInDB(id, 'room')),
  validate,

  param('hotelId', 'Invalid ID!').isMongoId(),
  validate,
  param('hotelId').custom(hotelId => idExistInDB(hotelId, 'hotel')),
  validate,
];
