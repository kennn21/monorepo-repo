'use client';
import LoginForm from '@/components/auth/login/login-form';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

const Login = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <div>
      {user}
      <LoginForm />
    </div>
  );
};

export default Login;
