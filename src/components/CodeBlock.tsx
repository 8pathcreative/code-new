import React, { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { CheckIcon, CopyIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({ 
  code, 
  language, 
  title, 
  showLineNumbers = true,
  className 
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn(
      "relative rounded-lg overflow-hidden my-6 bg-muted/40 border shadow-sm",
      className
    )}>
      {/* Header with filename and language */}
      {(title || language) && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted/70 border-b">
          {title && (
            <div className="font-mono text-sm text-muted-foreground">
              {title}
            </div>
          )}
          {language && (
            <div className="flex items-center">
              <span className="text-xs font-medium px-2 py-1 rounded bg-primary/10 text-primary">
                {language}
              </span>
            </div>
          )}
        </div>
      )}
      
      {/* Code content */}
      <div className="relative">
        <Highlight
          theme={themes.vsDark}
          code={code.trim()}
          language={language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre 
              className={cn(
                className,
                "overflow-x-auto py-4 text-sm leading-6"
              )}
              style={style}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })} className="table-row">
                  {showLineNumbers && (
                    <span className="table-cell text-right pr-4 select-none text-muted-foreground w-12 text-xs">
                      {i + 1}
                    </span>
                  )}
                  <span className="table-cell">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </span>
                </div>
              ))}
            </pre>
          )}
        </Highlight>
        
        {/* Copy button */}
        <div className="absolute top-2 right-2">
          <Button
            onClick={copyToClipboard}
            size="icon"
            variant="ghost"
            className="h-6 w-6 hover:bg-muted"
          >
            {copied ? <CheckIcon className="h-3 w-3 text-green-500" /> : <CopyIcon className="h-3 w-3" />}
          </Button>
        </div>
      </div>
    </div>
  );
}