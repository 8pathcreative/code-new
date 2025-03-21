import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CheckIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string; // Add this line
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

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn(
      "rounded-lg overflow-hidden bg-gray-900 my-4",
      className
    )}>
      {title && (
        <div className="px-4 py-2 bg-gray-800 text-gray-300 text-sm font-mono border-b border-gray-700 flex justify-between items-center">
          <span>{title}</span>
          <button
            onClick={handleCopy}
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-xs"
          >
            {copied ? (
              <>
                <CheckIcon className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <ClipboardIcon className="w-4 h-4" />
                <span>Copy code</span>
              </>
            )}
          </button>
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={atomDark}
        showLineNumbers={showLineNumbers}
        wrapLines
        customStyle={{
          margin: 0,
          padding: '1rem',
          fontSize: '0.9rem',
          maxHeight: '100%',
          overflow: 'auto'
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default CodeBlock;