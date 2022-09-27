'use strict';

import { Hotel } from '../models/index.js';

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    await newHotel.save();

    res.status(201).json({ ok: true, hotel: newHotel });
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      ok: true,
      hotel: updatedHotel,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async (req, res, next) => {
  const { id } = req.params;

  try {
    await Hotel.findByIdAndDelete(id);

    res.status(200).json({ ok: true, msg: 'Hotel successfully deleted!' });
  } catch (error) {
    next(error);
  }
};

export const getHotel = async (req, res, next) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findById(id);

    res.status(200).json({ ok: true, hotel });
  } catch (error) {
    next(error);
  }
};

export const getHotels = async (_req, res, next) => {
  try {
    const [hotels, total] = await Promise.all([
      Hotel.find(),
      Hotel.countDocuments(),
    ]);

    res.status(200).json({
      ok: true,
      total,
      hotels,
    });
  } catch (error) {
    next(error);
  }
};
