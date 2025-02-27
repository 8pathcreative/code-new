import React, { memo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import Icon from './Icon';
import { CategoryBadge } from '@/components/CategoryBadge';

interface ResourceCardProps {
  resource: {
    title: string;
    description: string;
    url?: string;
    categories?: {
      name: string;
      id?: string;
    }[];
  };
  onClick?: () => void;
}

function ResourceCard({ resource, onClick }: ResourceCardProps) {
  const { title, description, url, categories } = resource;
  
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/15 transition-colors">
              <Icon name="example-icon" className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold leading-tight">{title}</h2>
            </div>
          </div>
          <div className="mt-2 space-x-2">
            {categories?.map(category => (
              <CategoryBadge 
                key={category.id} 
                category={category}
              />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-6">
        <CardDescription className="text-base leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="pt-2 pb-4">
        {url && (
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-auto flex items-center gap-1"
            onClick={onClick}
            asChild
          >
            <a href={url} target="_blank" rel="noopener noreferrer">
              View Resource <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default memo(ResourceCard);