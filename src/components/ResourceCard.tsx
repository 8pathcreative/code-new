import React from 'react';
import * as Icons from 'lucide-react';
import { Resource } from '../lib/supabase';
import { useCategoriesStore } from '../lib/categories';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

type ResourceCardProps = {
  resource: Resource;
};

export function ResourceCard({ resource }: ResourceCardProps) {
  const Icon = Icons[resource.icon as keyof typeof Icons] || Icons.Link;
  const { getById } = useCategoriesStore();
  const category = getById(resource.category_id);

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/15 transition-colors">
              <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
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
        <Button
          variant="ghost"
          className="w-full gap-2 text-primary hover:text-primary hover:bg-primary/10 transition-colors"
          asChild
        >
          <a 
            href={resource.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            Visit Resource
            <ExternalLink className="w-4 h-4 ml-1" aria-hidden="true" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}