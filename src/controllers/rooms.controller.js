'use strict';

import { Hotel, Room } from '../models/index.js';

export const createRoom = async (req, res, next) => {
  const { hotelId } = req.params;

  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();

    await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });

    res.status(200).json({ ok: true, room: newRoom });
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      ok: true,
      room: updatedRoom,
    });
  } catch (error) {
    next(error);
  }
};

// Update nested properties
export const updateRoomAvailability = async (req, res, next) => {
  const { id } = req.params;

  try {
    await Room.updateOne(
      { 'roomNumbers._id': id },
      {
        $push: {
          'roomNumbers.$.unavailableDates': req.body.dates,
        },
      }
    );

    res
      .status(200)
      .json({ ok: true, message: 'Room status has been updated.' });
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req, res, next) => {
  const { id, hotelId } = req.params;

  try {
    await Room.findByIdAndDelete(id);

    await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: id } });

    res.status(200).json({ ok: true, msg: 'Room successfully deleted!' });
  } catch (error) {
    next(error);
  }
};

export const getRoom = async (req, res, next) => {
  const { id } = req.params;

  try {
    const room = await Room.findById(id);

    res.status(200).json({ ok: true, room });
  } catch (error) {
    next(error);
  }
};

export const getRooms = async (_req, res, next) => {
  try {
    const [rooms, total] = await Promise.all([
      Room.find(),
      Room.countDocuments(),
    ]);

    res.status(200).json({
      ok: true,
      total,
      rooms,
    });
  } catch (error) {
    next(error);
  }
};
