import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, BookOpen, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  image?: string;
  categories: string[];
  type: 'article' | 'tutorial' | 'video' | 'library' | 'tool';
  level?: 'beginner' | 'intermediate' | 'advanced';
  isNew?: boolean;
  isPremium?: boolean;
  publishedAt: string;
}

interface ResourceCardProps {
  resource: Resource;
  className?: string;
  variant?: 'default' | 'horizontal' | 'featured';
}

// Map resource types to icons
const typeIcons = {
  article: BookOpen,
  tutorial: BookOpen,
  video: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  library: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  ),
  tool: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
};

const levelColors = {
  beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  intermediate: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  advanced: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
};

export function ResourceCard({ resource, className, variant = 'default' }: ResourceCardProps) {
  const TypeIcon = typeIcons[resource.type] || BookOpen;
  
  // Format the date
  const formattedDate = new Date(resource.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  if (variant === 'horizontal') {
    return (
      <Card className={cn("flex overflow-hidden", className)}>
        {resource.image && (
          <div className="w-1/3 max-w-[180px] bg-muted">
            <img 
              src={resource.image} 
              alt={resource.title} 
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="flex flex-col flex-1 p-5">
          <div className="flex justify-between items-start mb-2">
            <div className="space-y-1">
              <h3 className="font-semibold text-lg leading-tight">
                {resource.title}
              </h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <TypeIcon className="h-3.5 w-3.5 mr-1" />
                <span className="capitalize">{resource.type}</span>
                <span className="mx-2">•</span>
                <span>{formattedDate}</span>
              </div>
            </div>
            {resource.isPremium && (
              <Badge variant="secondary" className="ml-2">Premium</Badge>
            )}
            {resource.isNew && (
              <Badge className="ml-2">New</Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {resource.description}
          </p>
          <div className="mt-auto flex justify-between items-center">
            <div className="flex flex-wrap gap-1">
              {resource.categories.slice(0, 3).map(category => (
                <Badge key={category} variant="outline" className="text-xs">
                  {category}
                </Badge>
              ))}
              {resource.categories.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{resource.categories.length - 3}
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" asChild>
              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                <span>View</span>
                <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
              </a>
            </Button>
          </div>
        </div>
      </Card>
    );
  }
  
  if (variant === 'featured') {
    return (
      <Card className={cn("overflow-hidden group", className)}>
        <div className="relative aspect-[16/9] bg-muted">
          {resource.image ? (
            <img 
              src={resource.image} 
              alt={resource.title} 
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-muted/80 to-muted">
              <TypeIcon className="h-12 w-12 text-muted-foreground/50" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute top-4 left-4 flex gap-2">
            {resource.level && (
              <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", levelColors[resource.level])}>
                {resource.level}
              </span>
            )}
            {resource.isPremium && (
              <Badge className="uppercase">Premium</Badge>
            )}
            {resource.isNew && (
              <Badge variant="secondary" className="uppercase">New</Badge>
            )}
          </div>
        </div>
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            <Link to={`/resources/${resource.id}`}>
              {resource.title}
            </Link>
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
            {resource.description}
          </p>
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <TypeIcon className="h-3.5 w-3.5 mr-1.5" />
            <span className="capitalize">{resource.type}</span>
            <span className="mx-2">•</span>
            <span>{formattedDate}</span>
          </div>
        </CardContent>
        <CardFooter className="pt-0 flex justify-between">
          <div className="flex flex-wrap gap-1.5">
            {resource.categories.slice(0, 3).map(category => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
            {resource.categories.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{resource.categories.length - 3}
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" className="gap-1.5" asChild>
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              View <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // Default card style
  return (
    <Card className={cn("overflow-hidden group h-full flex flex-col", className)}>
      {resource.image ? (
        <div className="aspect-[16/9] bg-muted overflow-hidden">
          <img 
            src={resource.image} 
            alt={resource.title} 
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="aspect-[16/9] bg-muted flex items-center justify-center">
          <TypeIcon className="h-10 w-10 text-muted-foreground/50" />
        </div>
      )}
      
      <CardContent className="flex-1 p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <TypeIcon className="h-3.5 w-3.5 mr-1.5" />
            <span className="capitalize">{resource.type}</span>
          </div>
          {resource.isNew && (
            <Badge className="text-xs">New</Badge>
          )}
          {resource.isPremium && (
            <Badge variant="secondary" className="text-xs">Premium</Badge>
          )}
        </div>
        
        <h3 className="font-semibold leading-tight mb-2 group-hover:text-primary transition-colors">
          <Link to={`/resources/${resource.id}`}>
            {resource.title}
          </Link>
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
          {resource.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mt-auto">
          {resource.categories.slice(0, 2).map(category => (
            <Badge key={category} variant="outline" className="text-xs">
              {category}
            </Badge>
          ))}
          {resource.categories.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{resource.categories.length - 2}
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="px-5 py-4 border-t flex justify-between items-center">
        <span className="text-xs text-muted-foreground">
          {formattedDate}
        </span>
        <Button variant="ghost" size="sm" className="gap-1.5 h-8" asChild>
          <a href={resource.url} target="_blank" rel="noopener noreferrer">
            View <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}