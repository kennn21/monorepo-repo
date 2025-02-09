import { Request, Response, NextFunction } from 'express';
import admin from '../config/firebase';

export const firebaseAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: No token provided' });
    return; // Ensure the function does not continue executing
  }

  const idToken = authHeader.split(' ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log(decodedToken);
    (req as any).user = decodedToken; // Attach user data to request
    next(); // Proceed to next middleware or route handler
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
    return; // Ensure the function does not continue executing
  }
};
