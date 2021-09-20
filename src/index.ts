require('dotenv').config();
import 'reflect-metadata';
import express from 'express';
import passport from 'passport';
import authRoutes from './routes/auth.route';
import ticketRoutes from './routes/tickets.route';
import createDbConnection from './database/create-connection';
import errorHandler from './middleware/errors.middleware';

require('./lib/passport');

const app = express();
const port = 3000;

const initializeDbConnection = async () => {
  try {
    await createDbConnection();
  } catch (error) {
    console.log(error);
  }
};

const initialize = async () => {
  await initializeDbConnection();
  app.use(express.json());
  app.use(passport.initialize());

  app.use('/api/auth', authRoutes);
  app.use('/api/tickets', ticketRoutes);
  app.use(errorHandler);
};

initialize();

app.listen(port, () => {
  console.log(`App is running on port ${port}.`);
});
