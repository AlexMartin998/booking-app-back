'use strict';

import express from 'express';

import './db/db.js';
import {
  setupMiddlewares,
  notFound,
  errorHandler,
} from './middlewares/index.js';
import {
  authRouter,
  hotelsRouter,
  roomsRouter,
  usersRouter,
} from './routes/index.js';

// Initializations
const app = express();

// Middlewares
setupMiddlewares(app);

// Router
app.use('/auth', authRouter);
app.use('/hotels', hotelsRouter);
app.use('/rooms', roomsRouter);
app.use('/users', usersRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
