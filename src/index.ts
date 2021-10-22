require('dotenv').config();
import express from 'express';
import passport from 'passport';
import cors from 'cors';

import authRoutes from './routes/auth.route';
import ticketRoutes from './routes/tickets.route';

import errorHandler from './middleware/errors.middleware';
import { prisma } from './lib/prisma';

require('./lib/passport');

const app = express();
const port = 5000;
app.use(cors());

const main = async () => {
  app.use(express.json());
  app.use(passport.initialize());
  app.use('/api/auth', authRoutes);
  app.use('/api/tickets', ticketRoutes);
  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`App is running on port ${port}.`);
  });
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
