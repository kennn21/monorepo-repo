'use client';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return <div>Hello {user?.email}!</div>;
};

export default Dashboard;
