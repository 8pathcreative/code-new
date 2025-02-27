// src/App.tsx
import { AuthProvider } from '@/contexts/AuthContext';
import { HelmetProvider } from 'react-helmet-async';
import { AppProvider } from './providers/AppProviders';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import PageLayout from "@/components/PageLayout";
import AppRoutes from './routes';

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