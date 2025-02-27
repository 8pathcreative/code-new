import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavigationMenuLink } from '@/components/ui/navigation-menu';

interface MegaMenuItemProps {
  title: string;
  href: string;
  description?: string;
  icon?: React.ReactNode | string;
}

export function MegaMenuItem({ title, href, description, icon }: MegaMenuItemProps) {
  const isExternal = href.startsWith('http');
  
  const content = (
    <div className="flex gap-3 items-start p-2 rounded-md hover:bg-muted">
      {icon && (
        <div className="flex items-center justify-center h-8 w-8 rounded-md bg-muted">
          {typeof icon === 'string' ? icon : icon}
        </div>
      )}
      <div>
        <div className="font-medium">{title}</div>
        {description && (
          <div className="line-clamp-1 text-sm text-muted-foreground">
            {description}
          </div>
        )}
      </div>
    </div>
  );
  
  if (isExternal) {
    return (
      import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavigationMenuLink } from '@/components/ui/navigation-menu';

interface MegaMenuItemProps {
  title: string;
  href: string;
  description?: string;
  icon?: React.ReactNode | string;
}

export function MegaMenuItem({ title, href, description, icon }: MegaMenuItemProps) {
  const isExternal = href.startsWith('http');
  
  const content = (
    <div className="flex gap-3 items-start p-2 rounded-md hover:bg-muted">
      {icon && (
        <div className="flex items-center justify-center h-8 w-8 rounded-md bg-muted">
          {typeof icon === 'string' ? icon : icon}
        </div>
      )}
      <div>
        <div className="font-medium">{title}</div>
        {description && (
          <div className="line-clamp-1 text-sm text-muted-foreground">
            {description}
          </div>
        )}
      </div>
    </div>
  );
  
  if (isExternal) {
    return (
      