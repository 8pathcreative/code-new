import React from 'react';
import { cn } from '@/lib/utils';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

export function Image({ src, alt, className, ...props }: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn('max-w-full h-auto', className)}
      loading="lazy"
      decoding="async"
      fetchPriority="high"
      {...props}
    />
  );
}