import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';

// Dummy in-memory database
let userData: { uid: string; email: string }[] = [
  {
    uid: 'sadsadasdas',
    email: 'dummy@gmail.com',
  },
  {
    uid: 'sadsadasdas2',
    email: 'dummy2@gmail.com',
  },
  {
    uid: 'sadsadasdas3',
    email: 'dummy3@gmail.com',
  },
];

export const helloWorld = onRequest((request, response) => {
  logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
});

export const users = onRequest((request, response) => {
  logger.info('Getting all users', { structuredData: true });
  response.send(userData);
});
