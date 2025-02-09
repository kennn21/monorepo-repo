import { Request, Response } from 'express';
import admin from 'firebase-admin';
import { User } from 'types';

export class UserController {
  // Get all users
  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const listUsersResult = await admin.auth().listUsers();

      // Translating into our user type
      const users: User[] = listUsersResult.users.map((user) => ({
        uid: user.uid,
        email: user.email ?? '',
      }));
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  }

  // Get user by ID
  static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const fbUser = await admin.auth().getUser(req.params.id);

      // Translating into our user type
      const user: User = {
        uid: fbUser.uid,
        email: fbUser.email ?? '',
      };
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: 'User not found' });
    }
  }
}
