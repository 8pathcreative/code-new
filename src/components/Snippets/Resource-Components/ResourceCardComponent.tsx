import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CategoryBadge } from '@/components/CategoryBadge';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

interface ResourceCardProps {
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  url: string;
  featured?: boolean;
  dateAdded?: string;
}

export function ResourceCard({
  title,
  description,
  category,
  tags,
  image,
  url,
  featured = false,
  dateAdded,
}: ResourceCardProps) {
  const isExternal = url.startsWith('http');
  
  return (
    <Card className={cn(
      "group overflow-hidden transition-all border bg-card",
      "hover:shadow-md hover:border-primary/20",
      featured ? "ring-1 ring-primary/20" : ""
    )}>
      {/* Image container with consistent aspect ratio */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
        
        {featured && (
          <div className="absolute top-2 left-2">
            <Badge variant="default" className="bg-primary text-primary-foreground">
              Featured
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-5">
        {/* Title and description */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 line-clamp-1">{title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
        </div>
        
        {/* Category */}
        <div className="mb-3">
          <CategoryBadge category={category} />
        </div>
        
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs font-normal">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs font-normal">
                +{tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="px-5 py-4 border-t bg-muted/30 flex justify-between items-center">
        {isExternal ? (
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
          >
            Visit Resource
            <ExternalLinkIcon className="h-3.5 w-3.5" />
          </a>
        ) : (
          <Link 
            to={url}
            className="text-sm font-medium text-primary hover:underline"
          >
            View Details
          </Link>
        )}
        
        {dateAdded && (
          <span className="text-xs text-muted-foreground">
            Added {new Date(dateAdded).toLocaleDateString()}
          </span>
        )}
      </CardFooter>
    </Card>
  );
}