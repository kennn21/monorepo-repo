'use client';
import { AppProvider } from '@/context/app-context';
import { persistor, store } from '@/store/store';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const PagesLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppProvider>{children}</AppProvider>
      </PersistGate>
    </Provider>
  );
};

export default PagesLayout;
