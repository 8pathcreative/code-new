import React from 'react';
import { twMerge } from 'tailwind-merge';

// Define the shape of our category data from Supabase
export interface Category {
  id: string | number;
  name: string;
  color?: string; // Optional color identifier
  slug?: string;
}

// Color variations based on the TailwindUI badge component
const colorVariants = {
  gray: 'bg-gray-50 text-gray-600 ring-gray-500/10',
  red: 'bg-red-50 text-red-700 ring-red-600/10',
  yellow: 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
  green: 'bg-green-50 text-green-700 ring-green-600/20',
  blue: 'bg-blue-50 text-blue-700 ring-blue-700/10',
  indigo: 'bg-indigo-50 text-indigo-700 ring-indigo-700/10',
  purple: 'bg-purple-50 text-purple-700 ring-purple-700/10',
  pink: 'bg-pink-50 text-pink-700 ring-pink-700/10',
};

// Default color mapping for common categories
const categoryColorMap: Record<string, keyof typeof colorVariants> = {
  javascript: 'yellow',
  typescript: 'blue',
  react: 'blue',
  vue: 'green',
  angular: 'red',
  node: 'green',
  python: 'blue',
  ruby: 'red',
  css: 'indigo',
  html: 'red',
  design: 'purple',
  ui: 'pink',
  ux: 'pink',
  tutorial: 'green',
  article: 'gray',
  video: 'red',
  tool: 'indigo',
  library: 'blue',
  framework: 'purple',
};

interface CategoryBadgeProps {
  category: Category | string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function CategoryBadge({ 
  category, 
  className = '',
  size = 'md' 
}: CategoryBadgeProps) {
  // Handle string or object input
  const categoryName = typeof category === 'string' ? category : category.name;
  const categorySlug = typeof category === 'string' ? category.toLowerCase() : (category.slug || category.name.toLowerCase());
  
  // Determine color based on category or explicitly provided color
  let colorKey: keyof typeof colorVariants;
  if (typeof category !== 'string' && category.color && colorVariants[category.color as keyof typeof colorVariants]) {
    colorKey = category.color as keyof typeof colorVariants;
  } else {
    // Try to match by name, fallback to gray if not found
    colorKey = categoryColorMap[categorySlug] || 'gray';
  }
  
  // Get the color classes
  const colorClasses = colorVariants[colorKey];
  
  // Size variants
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5 rounded',
    md: 'text-xs px-2.5 py-0.5 rounded-md',
    lg: 'text-sm px-3 py-1 rounded-md',
  };
  
  return (
    <span 
      className={twMerge(
        'inline-flex items-center font-medium ring-1 ring-inset',
        colorClasses,
        sizeClasses[size],
        className
      )}
    >
      {categoryName}
    </span>
  );
}