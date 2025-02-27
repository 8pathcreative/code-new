// src/routes.tsx
import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

// Eagerly loaded pages (commonly accessed)
import Home from './pages/Home';
import { About } from './pages/About';
import { Pricing } from './pages/Pricing';
import { Contact } from './pages/Contact';
import { Legal } from './pages/Legal';
import Playground from './pages/Playground';
import SnippetsPage from './pages/SnippetsPage';
import Advertise from './pages/Advertise';

// Lazy loaded pages (less frequently accessed or heavier)
const ResourcesPage = React.lazy(() => import('./pages/Resources-Listing'));
const ResourcesPageV3 = React.lazy(() => import('./pages/Resources-Main-V3'));
const ResourcePageNew = React.lazy(() => import('./pages/ResourcePageNew'));
const SandboxCode = React.lazy(() => import('./pages/SandboxCode'));
const SandboxCodeV2 = React.lazy(() => import('./pages/SandboxCodeV2'));
const ExampleV1 = React.lazy(() => import('./pages/ExampleV1'));
const NewPage = React.lazy(() => import('./pages/NewPage'));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <PageLoader />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/legal" element={<Legal />} />
      <Route path="/advertise" element={<Advertise />} />
      
      {/* Resource routes */}
      <Route path="/resources" element={
        <Suspense fallback={<PageLoader />}>
          <ResourcesPage />
        </Suspense>
      } />
      <Route path="/resources/v3" element={
        <Suspense fallback={<PageLoader />}>
          <ResourcesPageV3 />
        </Suspense>
      } />
      <Route path="/resources/new" element={
        <Suspense fallback={<PageLoader />}>
          <ResourcePageNew />
        </Suspense>
      } />
      
      {/* Playground/Sandbox routes */}
      <Route path="/playground" element={<Playground />} />
      <Route path="/sandbox" element={
        <Suspense fallback={<PageLoader />}>
          <SandboxCode />
        </Suspense>
      } />
      <Route path="/sandbox/v2" element={
        <Suspense fallback={<PageLoader />}>
          <SandboxCodeV2 />
        </Suspense>
      } />
      
      {/* Examples */}
      <Route path="/examples/v1" element={
        <Suspense fallback={<PageLoader />}>
          <ExampleV1 />
        </Suspense>
      } />
      
      {/* Snippets routes */}
      <Route path="/snippets" element={<SnippetsPage />} />
      
      {/* Protected routes - require authentication */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Suspense fallback={<PageLoader />}>
            <NewPage />
          </Suspense>
        </ProtectedRoute>
      } />
      
      {/* Catch all - 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

// Simple 404 page
const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <h1 className="text-4xl font-bold mb-4">404</h1>
    <p className="text-xl mb-6">Page not found</p>
    <a href="/" className="text-blue-600 hover:underline">Return home</a>
  </div>
);

export default AppRoutes;