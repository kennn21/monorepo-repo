'use client';
import LoginForm from '@/components/(pages)/auth/login/login-form';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

const Login = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <div>
      {user?.name}
      <LoginForm />
    </div>
  );
};

export default Login;
