'use strict';

import { Schema, model } from 'mongoose';

const HotelSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required!'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'Type is required!'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City is required!'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Address is required!'],
      trim: true,
    },
    distance: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
    },
    title: {
      type: String,
      required: [true, 'Title is required!'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required!'],
      trim: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    rooms: {
      type: [String],
    },
    cheapestPrice: {
      type: Number,
      required: [true, 'Cheapest price is required!'],
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model('Hotel', HotelSchema);
