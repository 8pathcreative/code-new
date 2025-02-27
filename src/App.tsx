// src/App.tsx
import { HelmetProvider } from 'react-helmet-async';
import { AppProvider } from './providers/AppProviders';
import PageLayout from "@/components/PageLayout";
import AppRoutes from './routes'; // We'll create this next
import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <AppProvider>
          <BrowserRouter>
            <PageLayout>
              <AppRoutes />
              <Toaster position="top-right" />
            </PageLayout>
          </BrowserRouter>
        </AppProvider>
      </HelmetProvider>
    </AuthProvider>
  );
}

export default App;