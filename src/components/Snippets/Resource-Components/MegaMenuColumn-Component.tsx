import React, { ReactNode } from 'react';

interface MegaMenuColumnProps {
  title: string;
  children: ReactNode;
}

export function MegaMenuColumn({ title, children }: MegaMenuColumnProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-medium text-sm text-muted-foreground tracking-wide uppercase">
        {title}
      </h3>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}