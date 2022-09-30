'use strict';

import { Schema, model } from 'mongoose';
import bcryptjs from 'bcryptjs';

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required!'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required!'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.pre('save', async function (next) {
  // If the pass is already hashed, it don't re-hashet it
  if (!this.isModified('password')) return next();

  const hash = await bcryptjs.hash(this.password, 10);
  this.password = hash;

  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  user.uid = user._id;

  delete user._id;
  delete user.password;
  // delete user.isAdmin;
  delete user.createdAt;
  delete user.updatedAt;

  return user;
};

export default model('User', UserSchema);
