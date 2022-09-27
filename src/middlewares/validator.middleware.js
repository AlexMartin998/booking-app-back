'use strict';

import { body, validationResult } from 'express-validator';
import { isAlreadyRegistered } from '../helpers/index.js';

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
