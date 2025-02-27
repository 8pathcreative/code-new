// src/App.tsx
import { AppProvider } from './providers/AppProviders';
import PageLayout from '@/src/components/PageLayout';
import AppRoutes from './routes'; // We'll create this next
import React from 'react';

function App() {
  return (
    <AppProvider>
      <PageLayout>
        <AppRoutes />
      </PageLayout>
    </AppProvider>
  );
}

export default App;