// src/App.tsx
import { AppProvider } from './providers/AppProvider';
import { PageLayout } from './components/Layout/PageLayout';
import AppRoutes from './routes'; // We'll create this next

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