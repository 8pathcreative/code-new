// src/providers/AppProvider.tsx
import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import { AuthProvider } from '../contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const AppContext = createContext(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [state, setState] = useState({});

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <AppContext.Provider value={{ state, setState }}>
            {children}
          </AppContext.Provider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export const useAppContext = () => useContext(AppContext);