'use client';

import { attachIdToken, detachIdToken } from '@/lib/api';
import { RootState, store } from '@/store/store';
import { createTheme, ThemeProvider } from '@mui/material';
import { useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { persistStore } from 'redux-persist';

const AppContext = createContext(undefined);

// I like to use global app provider for all pages (except root, to allow metadata injection)
// for putting all providers and global event handlers (e.g when user state changed, do something)
// to achieve:
// 1. Scalability: Allow other providers (custom or libraries) to be added here
// 2. Readability: Centralized all providers and global event handlers
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [interceptor, setInterceptor] = useState<number | undefined>();

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#ff5252',
      },
    },
  });

  const reduxPersistor = persistStore(store);

  const user = useSelector((state: RootState) => state.auth.user);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsubscribe = reduxPersistor.subscribe(() => {
      setHydrated(true);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (hydrated && !user) {
      router.replace('/auth/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, hydrated]);

  useEffect(() => {
    if (!user) {
      if (interceptor) {
        detachIdToken(interceptor);
      }
    } else {
      const interceptor = attachIdToken(user.idToken);
      console.log(interceptor);
      setInterceptor(interceptor);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <AppContext.Provider value={undefined}>
      <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
