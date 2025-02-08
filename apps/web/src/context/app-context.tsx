'use client';

import { createTheme, ThemeProvider } from '@mui/material';
import { useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AppContextType {
  user: string | null;
  setUser: (user: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const router = useRouter();

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#ff5252',
      },
    },
  });

  useEffect(() => {
    // TODO: Set auth checking condition
    router.push('/auth/login');
  }, [router]);

  return (
    <AppContext.Provider value={{ user, setUser }}>
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
