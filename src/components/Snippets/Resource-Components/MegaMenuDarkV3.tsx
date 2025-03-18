import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/lib/theme';

export function MegaMenu() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useThemeStore();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    {
      title: 'Products',
      columns: [
        {
          title: 'Developer Tools',
          items: [
            {
              title: 'Component Library',
              description: 'Ready-made UI components',
              href: '/products/components',
              icon: '🧩'
            },
            {
              title: 'Code Generator',
              description: 'AI-powered code snippets',
              href: '/products/generator',
              icon: '⚡'
            },
            {
              title: 'API Explorer',
              description: 'Test and document APIs',
              href: '/products/api-explorer',
              icon: '🔌'
            }
          ]
        },
        {
          title: 'Design Resources',
          items: [
            {
              title: 'UI Kits',
              description: 'Professional design resources',
              href: '/products/ui-kits',
              icon: '🎨'
            },
            {
              title: 'Icon Library',
              description: 'Customizable icon sets',
              href: '/products/icons',
              icon: '✨'
            }
          ]
        }
      ]
    },
    {
      title: 'Learn',
      columns: [
        {
          title: 'Documentation',
          items: [
            {
              title: 'Getting Started',
              description: 'Quick start guides',
              href: '/docs/getting-started',
              icon: '🚀'
            },
            {
              title: 'API Reference',
              description: 'Detailed API documentation',
              href: '/docs/api',
              icon: '📘'
            },
            {
              title: 'Examples',
              description: 'Code examples and demos',
              href: '/docs/examples',
              icon: '💻'
            }
          ]
        },
        {
          title: 'Resources',
          items: [
            {
              title: 'Tutorials',
              description: 'Step-by-step guides',
              href: '/resources/tutorials',
              icon: '📝'
            },
            {
              title: 'Blog',
              description: 'Articles and updates',
              href: '/blog',
              icon: '✏️'
            }
          ]
        }
      ]
    },
    {
      title: 'Resources',
      href: '/resources'
    },
    {
      title: 'Pricing',
      href: '/pricing'
    }
  ];
  
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-40 transition-all duration-200",
      isScrolled 
        ? "bg-background/95 backdrop-blur-sm border-b shadow-sm" 
        : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Code Tutorials
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-1">
          <NavigationMenu>
            <NavigationMenuList>
              {menuItems.map((item, index) => (
                <NavigationMenuItem key={index}>
                  {item.columns ? (
                    <>
                      <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid grid-cols-2 gap-3 p-4 w-[600px]">
                          {item.columns.map((column, colIndex) => (
                            <div key={colIndex} className="space-y-3">
                              {/* Column content would go here */}
                            </div>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link to={item.href} className={navigationMenuTriggerStyle()}>
                      {item.title}
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
                  </NavigationMenu>
                </div>
              </div>
              </header>
            );
        }