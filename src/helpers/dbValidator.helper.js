'use strict';

import { Hotel, User } from '../models/index.js';

export const isAlreadyRegistered = async (query, collection) => {
  let model;

  const checkInCollection = () => {
    if (model)
      throw new Error(
        `The ${collection}${
          query.includes('@') ? "'s email" : ' username'
        } is already registered!`
      );
  };

  switch (collection) {
    case 'user':
      model = await User.findOne({ email: query });
      return checkInCollection();

    case 'username':
      model = await User.findOne({ username: query });
      return checkInCollection();

    default:
      throw new Error('Something went wrong!');
  }
};

export const idExistInDB = async (id, collection) => {
  let model;

  const checkInCollection = () => {
    if (!model)
      throw new Error(`${collection} ID: '${id} doesn't exist!`);
  };

  switch (collection) {
    case 'user':
      model = await User.findById(id);
      return checkInCollection();

    case 'hotel':
      model = await Hotel.findById(id);
      return checkInCollection();

    default:
      throw new Error('Something went wrong!');
  }
};
