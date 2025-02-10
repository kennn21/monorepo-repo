import { Request, Response } from 'express';
import { User } from 'types';
import admin from '../config/firebase';

const db = admin.firestore();
const usersCollection = db.collection('users');

export class UserController {
  // Get all users
  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const listUsersResult = await admin.auth().listUsers();

      const users: User[] = await Promise.all(
        listUsersResult.users.map(async (user) => {
          const userRef = usersCollection.doc(user.uid);
          const userDoc = await userRef.get();
          let userData = userDoc.exists ? userDoc.data() : {};

          // Set default values if missing
          const name = userData?.name ?? 'Unknown';
          const age = userData?.age ?? 18;

          const userObj: User = {
            uid: user.uid,
            email: user.email ?? '',
            name,
            age,
          };

          // Ensure Firestore has updated user info
          await userRef.set(userObj, { merge: true });

          return userObj;
        }),
      );

      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  }

  // Get user by ID
  static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // Get user from Firebase Auth
      const fbUser = await admin.auth().getUser(id);

      // Get user from Firestore
      const userDoc = await usersCollection.doc(id).get();
      let userData = userDoc.exists ? userDoc.data() : {};

      // Set defaults if missing
      const name = userData?.name ?? 'Unknown';
      const age = userData?.age ?? 18; // Default age

      // Construct user object
      const user: User = {
        uid: fbUser.uid,
        email: fbUser.email ?? '',
        name,
        age,
      };

      // Save user in Firestore if missing
      if (!userDoc.exists || !userData?.name || !userData.age) {
        await usersCollection.doc(id).set({ name, age }, { merge: true });
      }

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: 'User not found' });
    }
  }

  // Update user
  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { email, name, age } = req.body;

      console.log({ email });

      if (!email) {
        res.status(400).json({ error: 'Email is required' });
        return;
      }

      // Update Firebase Auth
      await admin.auth().updateUser(id, { email, displayName: name });

      // Update Firestore
      await usersCollection.doc(id).update({ email, name, age });

      res.json({ message: 'User updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  }
}
