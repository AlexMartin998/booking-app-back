'use strict';

import { Schema, model } from 'mongoose';

const RoomSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required!'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required!'],
    },
    maxPeople: {
      type: Number,
      required: [true, 'Max people is required!'],
    },
    description: {
      type: String,
      required: [true, 'Description is required!'],
    },
    roomNumbers: [
      {
        number: Number,
        unavailableDates: { type: [Date] },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model('Room', RoomSchema);
