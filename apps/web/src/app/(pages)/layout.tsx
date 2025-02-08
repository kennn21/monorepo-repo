'use client';
import { AppProvider } from '@/context/app-context';
import { store } from '@/store/store';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

const PagesLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <AppProvider>{children}</AppProvider>
    </Provider>
  );
};

export default PagesLayout;
