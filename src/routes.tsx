// src/routes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { About } from './pages/About';
import { Pricing } from './pages/Pricing';
import { Contact } from './pages/Contact';
import { Legal } from './pages/Legal';
import SnippetsPage from './pages/SnippetsPage';
import Advertise from './pages/Advertise';

const ExampleV1 = React.lazy(() => import('./pages/ExampleV1'));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/legal" element={<Legal />} />
      <Route 
        path="/example-v1" 
        element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <ExampleV1 />
          </React.Suspense>
        } 
      />
      <Route path="/snippets" element={<SnippetsPage />} />
      <Route path="/advertise" element={<Advertise />} />
    </Routes>
  );
};

export default AppRoutes;