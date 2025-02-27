// src/App.tsx
import { HelmetProvider } from 'react-helmet-async';
import { AppProvider } from './providers/AppProviders';
import PageLayout from "@/components/PageLayout";
import AppRoutes from './routes'; // We'll create this next
import React from 'react';

function App() {
  return (
    <HelmetProvider>
      <AppProvider>
        <PageLayout>
          <AppRoutes />
        </PageLayout>
      </AppProvider>
    </HelmetProvider>
  );
}

export default App;