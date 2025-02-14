import React from 'react';
import { Button } from '@/components/ui/button';
import type { Category } from '@/lib/supabase';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="relative pb-12 mb-8">
      <div className="flex gap-2 overflow-x-auto pb-6 justify-center">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'ghost'}
          onClick={() => onSelectCategory('all')}
          className="min-w-[100px]"
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.slug ? 'default' : 'ghost'}
            onClick={() => onSelectCategory(category.slug)}
            className="min-w-[100px]"
          >
            {category.name}
          </Button>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}