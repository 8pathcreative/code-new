// src/components/Layout/PageLayout.tsx
import React from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Toaster } from 'react-hot-toast';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  className = '' 
}) => {
  const isDark = useThemeStore((state) => state.isDark);
  
  return (
    <div 
      className={`${isDark ? 'dark' : ''} min-h-screen flex flex-col bg-background`}
      data-theme={isDark ? 'dark' : 'light'}
    >
      <Header />
      <main className={`flex-1 ${className}`}>
        {children}
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
};