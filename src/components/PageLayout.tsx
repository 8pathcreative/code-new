// src/components/Layout/PageLayout.tsx
import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useThemeStore } from '../lib/theme';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const isDark = useThemeStore((state) => state.isDark);

  return (
    <div 
      className={`${isDark ? 'dark' : ''} min-h-screen flex flex-col`}
      data-theme={isDark ? 'dark' : 'light'}
    >
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;