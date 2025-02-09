'use client';
import LoginForm from '@/components/(pages)/auth/login/login-form';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Login = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [router, user]);
  return (
    <div>
      {user?.email}
      <LoginForm />
    </div>
  );
};

export default Login;
