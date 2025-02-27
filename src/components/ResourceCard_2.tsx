// src/components/resource-card.jsx
import { memo } from 'react';
import * as Icons from 'lucide-react';
import { CategoryBadge } from './CategoryBadge';
import React from 'react';

const ResourceCard_2 = ({ resource }) => {
  const { title, description, url, category } = resource;
  
  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-medium text-lg mb-2 resource-card-new">{title}</h3>
      {description && <p className="text-gray-600 mb-3 text-sm">{description}</p>}
      <div className="flex justify-between items-center">
        <CategoryBadge category={category} />
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

export default memo(ResourceCard_2);