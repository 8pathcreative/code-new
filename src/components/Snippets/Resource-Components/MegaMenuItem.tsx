import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface MegaMenuItemProps {
  title: string;
  description?: string;
  href: string;
  icon?: React.ReactNode | string;
}

export function MegaMenuItem({ title, description, href, icon }: MegaMenuItemProps) {
  return (
    <Link to={href} className="block select-none space-y-1 rounded-md p-3 hover:bg-accent/50 transition-colors">
      <div className="flex items-center gap-2">
        {icon && <span className="w-5 h-5 flex items-center justify-center">{icon}</span>}
        <div className="font-medium">{title}</div>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </Link>
  );
}
