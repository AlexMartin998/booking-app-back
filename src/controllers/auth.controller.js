'use strict';

import { User } from '../models/index.js';
import { genJWT } from '../helpers/index.js';
import { createError } from '../utils/error.js';

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });

  try {
    await user.save();

    res.status(201).json({ ok: true, message: 'User has been created.', user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    const matchPass = await user?.comparePassword(password);
    if (!user || !matchPass)
      return next(
        createError(
          401,
          'There was a problem logging in. Check your email and password or create an account.'
        )
      );

    // Gen JWT
    const token = await genJWT(user.id);

    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json({ ok: true, message: 'Successful login.', user, token });
  } catch (error) {
    next(error);
  }
};

export const renewJwt = async (req, res) => {
  const { authenticatedUser } = req;
  if (!authenticatedUser)
    res.status(401).json({ ok: false, msg: 'Unathorized!' });

  // Gen JWT
  const token = await genJWT(authenticatedUser.id);

  res.status(200).json({
    ok: true,
    token,
    user: authenticatedUser,
  });
};
