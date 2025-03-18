// src/components/resource-card.tsx
import { memo } from 'react';
import * as Icons from 'lucide-react';
import { CategoryBadge } from './CategoryBadge';
import React from 'react';

interface Category {
  id: string;
  name: string;
}

interface Resource {
  title: string;
  description?: string;
  url: string;
  categories?: Category[];
}

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard = ({ resource }: ResourceCardProps) => {
  const { title, description, url, categories } = resource;
  
  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-medium text-lg mb-2 resource-card-new">{title}</h3>
      {description && <p className="text-gray-600 mb-3 text-sm">{description}</p>}
      <div className="mt-2 space-x-2">
        {categories?.map((category) => (
          <CategoryBadge 
            key={category.id} 
            category={category}
          />
        ))}
      </div>
      <div className="flex justify-between items-center">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View Resource →
        </a>
      </div>
    </div>
  );
};

export default memo(ResourceCard);