// src/components/Snippets/Resource-Components/MegaMenuColumn.tsx
import React, { ReactNode } from 'react';

interface MegaMenuColumnProps {
  title: string;
  children: ReactNode;
}

export function MegaMenuColumn({ title, children }: MegaMenuColumnProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">{title}</h3>
      {children}
    </div>
  );
}