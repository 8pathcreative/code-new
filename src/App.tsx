import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { supabase } from './lib/supabase';
import { useAuthStore } from './lib/auth';
import { useThemeStore } from './lib/theme';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import { About } from './pages/About';
import { Pricing } from './pages/Pricing';
import { Contact } from './pages/Contact';
import { Legal } from './pages/Legal';
import { ExampleV1 } from './pages/ExampleV1';
import { ConnectionStatus } from './components/ConnectionStatus';
import SnippetsPage from './pages/SnippetsPage';
import Advertise from './pages/Advertise';

function App() {
  const setUser = useAuthStore((state) => state.setUser);
  const isDark = useThemeStore((state) => state.isDark);

  useEffect(() => {
    // Set initial user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  const hasSupabaseConfig = Boolean(
    import.meta.env.VITE_SUPABASE_URL && 
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );

  return (
    <Router>
      <div className={isDark ? 'dark' : ''} data-theme={isDark ? 'dark' : 'light'}>
        <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
          <Header />
          <main className="flex-1">
            {!hasSupabaseConfig && <ConnectionStatus />}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/example-v1" element={<ExampleV1 />} />
              <Route path="/snippets" element={<SnippetsPage />} />
              <Route path="/advertise" element={<Advertise />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </div>
    </Router>
  );
}

export default App;