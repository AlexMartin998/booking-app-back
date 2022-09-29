'use strict';

import { Hotel, Room } from '../models/index.js';

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

export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;

  const searchCriteria = {
    ...others,
    cheapestPrice: {
      $gt: min | 1,
      $lt: max || Infinity,
    },
  };

  try {
    const [hotels, total] = await Promise.all([
      Hotel.find(searchCriteria).limit(req.query.limit),
      Hotel.countDocuments(searchCriteria),
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

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(',');

  try {
    const list = await Promise.all(
      cities.map(city => {
        return Hotel.countDocuments({ city: city });
      })
    );

    res.status(200).json({
      ok: true,
      list,
    });
  } catch (error) {
    next(error);
  }
};

export const countByType = async (req, res, next) => {
  const types = ['hotel', 'apartments', 'resorts', 'villas', 'cobins'];

  try {
    const list = await Promise.all(
      types.map(type => Hotel.countDocuments({ type }))
    );
    const typeList = list.map((c, i) => ({
      type: types[i],
      count: c,
    }));

    res.status(200).json([...typeList]);
  } catch (error) {
    next(error);
  }
};

// TODO: populate al hotel
export const getHotelRooms = async (req, res, next) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findById(id);

    const list = await Promise.all(
      hotel.rooms.map(room => Room.findById(room))
    );

    res.status(200).json({ ok: true, rooms: list });
  } catch (error) {
    next(error);
  }
};
