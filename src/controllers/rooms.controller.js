'use strict';

import { Hotel, Room } from '../models/index.js';

export const createRoom = async (req, res, _next) => {
  const { hotelId } = req.params;

  const newRoom = new Room(req.body);

  try {
    await newRoom.save();

    await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: newRoom.id } });

    res.status(200).json({ ok: true, room: newRoom });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: 'Error' });
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
