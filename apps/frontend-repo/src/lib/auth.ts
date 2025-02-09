import app, { auth } from '@/lib/firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { User } from 'types';
import { jwtDecode } from 'jwt-decode';

export const checkTokenExpiry = async () => {
  const auth = getAuth(app);
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken();
    const decodedToken: { exp: number } = jwtDecode(token);
    const expiryDate = new Date(decodedToken.exp * 1000); // Convert to milliseconds
    console.log('Token expires at:', expiryDate);
  }
};

export const handleGoogleLogin = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const fbUser = result.user;

    const { uid } = fbUser;

    const idToken = await fbUser.getIdToken();

    // console.log(await checkTokenExpiry());

    // Attach to redux state
    const user: User = { uid, email: email ?? '', idToken: idToken ?? '' };
    return user;
  } catch (error) {
    console.error('Login Error:', error);
  }
};
