'use client';

import { createTheme, ThemeProvider } from '@mui/material';
import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AuthState } from 'types';

const AppContext = createContext(undefined);

// I like to use global app provider for all pages (except root, to allow metadata injection)
// for putting all providers and global event handlers (e.g when user state changed, do something)
// to achieve:
// 1. Scalability: Allow other providers (custom or libraries) to be added here
// 2. Readability: Centralized all providers and global event handlers
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#ff5252',
      },
    },
  });

  const user = useSelector((state: AuthState) => state.user);

  useEffect(() => {
    if (!user) {
      router.replace('/auth/login');
    }
  }, [router, user]);

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
