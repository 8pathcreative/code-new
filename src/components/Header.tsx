import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useAuthStore } from '@/lib/auth';
import { useThemeStore } from '@/lib/theme';
import { AuthModal } from "@/components/AuthModal";
import { Button } from '@/components/ui/button';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const { isDark, toggleTheme } = useThemeStore();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Advertise', href: '/advertise' },
    { name: 'Playground', href: '/playground' },
  ];

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container h-16 flex items-center" aria-label="Main navigation">
        <div className="flex items-center justify-between w-full">
          <Link
            to="/"
            className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
          >
            Code Resources
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant={location.pathname === item.href ? 'default' : 'ghost'}
                className="text-sm"
                asChild
              >
                <Link to={item.href}>{item.name}</Link>
              </Button>
            ))}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="ml-2"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            {user ? (
              <Button
                variant="ghost"
                onClick={() => setIsAuthModalOpen(true)}
                className="text-sm"
              >
                Account
              </Button>
            ) : (
              <Button onClick={() => setIsAuthModalOpen(true)}>Sign In</Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-4 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b md:hidden">
            <div className="container py-4 space-y-2">
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  variant={location.pathname === item.href ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  asChild
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link to={item.href}>{item.name}</Link>
                </Button>
              ))}
              {user ? (
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  Account
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}