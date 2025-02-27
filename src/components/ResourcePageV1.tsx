import React, { useState, useEffect } from 'react';
import { SEO } from '@/components/SEO';
import { Header } from '@/components/Layout/Header';
import { ResourceCard } from '@/components/Resources/ResourceCard';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ChevronDownIcon,
  FilterIcon,
  SearchIcon,
  XIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data for resources
const MOCK_RESOURCES = [
  {
    id: 'react-hooks',
    title: 'React Hooks: A Complete Guide',
    description: 'Learn everything you need to know about React Hooks, from useState and useEffect to custom hooks.',
    url: 'https://example.com/react-hooks',
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1740&auto=format&fit=crop',
    categories: ['React', 'Hooks', 'JavaScript', 'Frontend'],
    type: 'tutorial',
    level: 'intermediate',
    isNew: true,
    publishedAt: '2023-12-01T12:00:00Z',
  },
  {
    id: 'nextjs-13',
    title: 'Next.js 13: The Ultimate Guide',
    description: 'Explore the new features in Next.js 13 including the app directory, server components, and more.',
    url: 'https://example.com/nextjs-13',
    image: 'https://images.unsplash.com/photo-1619410283995-43d9134e7656?q=80&w=1740&auto=format&fit=crop',
    categories: ['Next.js', 'React', 'Server Components', 'Frontend'],
    type: 'article',
    level: 'advanced',
    publishedAt: '2023-10-15T12:00:00Z',
  },
  {
    id: 'typescript-basics',
    title:import React, { useState, useEffect } from 'react';
import { SEO } from '@/components/SEO';
import { Header } from '@/components/Layout/Header';
import { ResourceCard } from '@/components/Resources/ResourceCard';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ChevronDownIcon,
  FilterIcon,
  SearchIcon,
  XIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock data for resources
const MOCK_RESOURCES = [
  {
    id: 'react-hooks',
    title: 'React Hooks: A Complete Guide',
    description: 'Learn everything you need to know about React Hooks, from useState and useEffect to custom hooks.',
    url: 'https://example.com/react-hooks',
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1740&auto=format&fit=crop',
    categories: ['React', 'Hooks', 'JavaScript', 'Frontend'],
    type: 'tutorial',
    level: 'intermediate',
    isNew: true,
    publishedAt: '2023-12-01T12:00:00Z',
  },
  {
    id: 'nextjs-13',
    title: 'Next.js 13: The Ultimate Guide',
    description: 'Explore the new features in Next.js 13 including the app directory, server components, and more.',
    url: 'https://example.com/nextjs-13',
    image: 'https://images.unsplash.com/photo-1619410283995-43d9134e7656?q=80&w=1740&auto=format&fit=crop',
    categories: ['Next.js', 'React', 'Server Components', 'Frontend'],
    type: 'article',
    level: 'advanced',
    publishedAt: '2023-10-15T12:00:00Z',
  },
  {
    id: 'typescript-basics',
    title: