import { Request, Response } from 'express';
import admin from 'firebase-admin';

export class UserController {
  // Get all users
  static async getAllUsers(req: Request, res: Response) {
    try {
      const listUsersResult = await admin.auth().listUsers();
      res.json({
        users: listUsersResult.users.map((user) => ({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  }

  // Get user by ID
  static async getUserById(req: Request, res: Response) {
    try {
      const user = await admin.auth().getUser(req.params.id);
      res.json({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      });
    } catch (error) {
      res.status(404).json({ error: 'User not found' });
    }
  }
}
