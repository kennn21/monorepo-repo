import admin from 'firebase-admin';
import { serviceAccount } from 'creds';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: 'asia-southeast1: https://(default).firebaseio.com',
});

export default admin;
