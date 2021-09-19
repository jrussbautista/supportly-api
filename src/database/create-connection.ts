import { createConnection as createDBConnection, Connection } from 'typeorm';
import { User } from './../entities/User';
import { Ticket } from '../entities/Ticket';

const createConnection = () => {
  return createDBConnection({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User, Ticket],
    synchronize: true,
    migrationsRun: true,
  });
};

export default createConnection;
