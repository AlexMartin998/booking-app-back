'use strict';

import jwt from 'jsonwebtoken';

import { User } from '../models/index.js';
import { SECRETORPRIVATEKEY_JWT } from '../config/index.js';
import { createError } from '../utils/error.js';

// check token in req.cookies
export const protectWithJwt = async (req, res, next) => {
  const tokenJwt = req.cookies.access_token;
  console.log(req.cookies);
  if (!tokenJwt) return next(createError(401, 'You are not authenticated!'));

  try {
    const { id } = jwt.verify(tokenJwt, SECRETORPRIVATEKEY_JWT);
    const user = await User.findById(id).select('username email isAdmin');
    if (!user) return next(createError(401, 'Invalid token!'));

    req.authenticatedUser = user;

    return next();
  } catch (error) {
    return next(createError(401, 'Invalid token!'));
  }
};

export const isAdminOrSameUser = (req, _res, next) => {
  if (!req.authenticatedUser.username)
    return next(createError(403, 'You are not authorized!'));

  const { id, isAdmin } = req.authenticatedUser;

  if (id.toString() === req.params.id || isAdmin) return next();

  return next(createError(403, 'You are not authorized!'));
};

export const verifyAdmin = (req, _res, next) => {
  if (!req.authenticatedUser.username)
    return next(createError(403, 'You are not authorized!'));

  const { isAdmin } = req.authenticatedUser;

  if (isAdmin) return next();

  return next(createError(403, 'You are not authorized!'));
};
