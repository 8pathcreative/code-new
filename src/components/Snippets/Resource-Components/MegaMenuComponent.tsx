import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { MegaMenuColumn } from './MegaMenuColumn';
import { MegaMenuItem } from './MegaMenuItem';
import { ThemeToggle } from '../ThemeToggle';
import { cn } from '@/lib/utils';
import { MenuIcon, XIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function MegaMenu() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Menu data structure
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
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/images/logo.svg" alt="Code Tutorials" className="h-8 w-8" />
            <span className="font-bold text-xl">Code Tutorials</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                {menuItems.map((item, index) => {
                  // Simple link without dropdown
                  if (item.href && !item.columns) {
                    return (
                      <NavigationMenuItem key={index}>
                        <Link to={item.href}>
                          <NavigationMenuLink className={cn(
                            "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium",
                            "transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none",
                            "data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                          )}>
                            {item.title}
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                    );
                  }
                  
                  // Dropdown menu
                  return (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuTrigger className="bg-transparent">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-[600px] p-4 md:grid md:grid-cols-2 gap-4">
                          {item.columns?.map((column, columnIndex) => (
                            <MegaMenuColumn key={columnIndex} title={column.title}>
                              {column.items.map((subItem, subItemIndex) => (
                                <MegaMenuItem
                                  key={subItemIndex}
                                  title={subItem.title}
                                  href={subItem.href}
                                  description={subItem.description}
                                  icon={subItem.icon}
                                />
                              ))}
                            </MegaMenuColumn>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
            
            {/* Theme toggle and CTA */}
            <ThemeToggle />
            <Button>Sign Up</Button>
          </div>
          
          {/* Mobile navigation */}
          <div className="flex lg:hidden items-center space-x-4">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MenuIcon className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="px-4 py-6">
                    <Link to="/" className="flex items-center space-x-2 mb-6">
                      <img src="/images/logo.svg" alt="Code Tutorials" className="h-8 w-8" />
                      <span className="font-bold text-xl">Code Tutorials</span>
                    </Link>
                    
                    <div className="flex flex-col space-y-6">
                      {menuItems.map((item, index) => {
                        if (item.href && !item.columns) {
                          return (
                            <Link 
                              key={index}
                              to={item.href} 
                              className="text-lg font-medium hover:text-primary"
                            >
                              {item.title}
                            </Link>
                          );
                        }
                        
                        return (
                          <div key={index} className="space-y-3">
                            <div className="font-medium text-lg">{item.title}</div>
                            
                            {item.columns?.map((column, columnIndex) => (
                              <div key={columnIndex} className="pl-4 space-y-3">
                                <div className="text-sm font-medium text-muted-foreground">{column.title}</div>
                                <div className="pl-2 space-y-2">
                                  {column.items.map((subItem, subItemIndex) => (
                                    <Link
                                      key={subItemIndex}
                                      to={subItem.href}
                                      className="flex items-center text-sm hover:text-primary"
                                    >
                                      <span className="mr-2">{subItem.icon}</span>
                                      {subItem.title}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="mt-auto p-4 border-t">
                    <Button className="w-full">Sign Up</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}