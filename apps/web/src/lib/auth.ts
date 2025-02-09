import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { User } from 'types';

export const handleGoogleLogin = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const fbUser = result.user;
    const { uid } = fbUser;

    const idToken = await fbUser.getIdToken();

    // Attach to redux state
    const user: User = { uid, email: email ?? '', idToken: idToken ?? '' };
    return user;
  } catch (error) {
    console.error('Login Error:', error);
  }
};
