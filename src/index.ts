require('dotenv').config();
import 'reflect-metadata';
import express from 'express';
import authRoutes from './routes/auth.route';
import ticketRoutes from './routes/tickets.route';
import createDbConnection from './database/create-connection';

const app = express();
const port = 3000;

const initializeDbConnection = async () => {
  try {
    await createDbConnection();
  } catch (error) {}
};

const initialize = async () => {
  await initializeDbConnection();
  app.use('/api/auth', authRoutes);
  app.use('/api/tickets', ticketRoutes);
};

initialize();

app.listen(port, () => {
  console.log(`App is running on port ${port}.`);
});
