'use strict';

import { User } from '../models/index.js';

export const updateUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      ok: true,
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({ ok: true, msg: 'User successfully deleted!' });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    res.status(200).json({ ok: true, user });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (_req, res, next) => {
  try {
    const [users, total] = await Promise.all([
      User.find(),
      User.countDocuments(),
    ]);

    res.status(200).json({
      ok: true,
      total,
      users,
    });
  } catch (error) {
    next(error);
  }
};
