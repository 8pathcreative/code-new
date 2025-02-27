import React from 'react';
import * as Icons from 'lucide-react';
import { Resource } from '../lib/supabase';
import { useCategoriesStore } from '../lib/categories';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { ExternalLink } from 'lucide-react';
import Icon from './Icon';

interface ResourceCardProps {
  resource: {
    title: string;
    description: string;
  };
  category?: {
    name: string;
  };
}

export function ResourceCard({ resource, category }: ResourceCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/15 transition-colors">
              <Icon name="example-icon" className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold leading-tight">{resource.title}</h2>
            </div>
          </div>
          {category && (
            <span className="inline-flex items-center rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary">
              {category.name}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-6">
        <CardDescription className="text-base leading-relaxed">
          {resource.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="pt-2 pb-4">
      </CardFooter>
    </Card>
  );
}

export default ResourceCard;