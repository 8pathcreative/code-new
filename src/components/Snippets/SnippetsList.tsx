import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CodeBlock } from './CodeBlock';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// Define TypeScript interfaces
interface Snippet {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface SnippetsListProps {
  snippets: Snippet[];
  isLoading?: boolean;
  error?: string | null;
}

export function SnippetsList({ snippets, isLoading = false, error = null }: SnippetsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [expandedSnippet, setExpandedSnippet] = useState<string | null>(null);
  
  // Filter snippets based on search term and selected language
  const filteredSnippets = snippets.filter(snippet => {
    const matchesSearch = searchTerm === '' || 
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLanguage = selectedLanguage === null || snippet.language === selectedLanguage;
    
    return matchesSearch && matchesLanguage;
  });
  
  // Get unique languages for the filter dropdown
  const languages = Array.from(new Set(snippets.map(snippet => snippet.language)));

  const toggleExpandSnippet = (id: string) => {
    setExpandedSnippet(prev => prev === id ? null : id);
  };
  
  if (isLoading) {
    return (
      <div className="w-full py-8 space-y-6">
        {[1, 2, 3].map(i => (
          <Card key={i}>
            <CardHeader className="pb-4">
              <Skeleton className="h-8 w-[250px]" />
              <Skeleton className="h-4 w-[300px] mt-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[200px] w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        <p>Error loading snippets: {error}</p>
      </div>
    );
  }
  
  return (
    <div className="w-full space-y-6">
      {/* Search and filter controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search snippets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="sm:w-48">
          <Select
            value={selectedLanguage || ''}
            onValueChange={(value) => setSelectedLanguage(value || null)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All languages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All languages</SelectItem>
              {languages.map(language => (
                <SelectItem key={language} value={language}>{language}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredSnippets.length} of {snippets.length} snippets
      </p>
      
      {/* Snippets list */}
      {filteredSnippets.length > 0 ? (
        <div className="space-y-6">
          {filteredSnippets.map((snippet) => (
            <Card key={snippet.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{snippet.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {snippet.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <CodeBlock 
                  code={snippet.code}
                  language={snippet.language}
                  title={`${snippet.title}.${snippet.language}`}
                  showLineNumbers={true}
                  className={expandedSnippet === snippet.id ? "max-h-none" : "max-h-[300px]"}
                />
                {snippet.code.split('\n').length > 12 && (
                  <Button
                    variant="ghost"
                    onClick={() => toggleExpandSnippet(snippet.id)}
                    className="text-xs mt-2"
                  >
                    {expandedSnippet === snippet.id ? "Show less" : "Show more"}
                  </Button>
                )}
              </CardContent>
              
              <CardFooter className="border-t pt-4 flex flex-wrap justify-between">
                <div className="flex flex-wrap gap-2 mb-2 sm:mb-0">
                  {snippet.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground">
                  Updated {new Date(snippet.updatedAt).toLocaleDateString()}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 px-4 rounded-lg border bg-muted/40">
          <h3 className="mt-2 text-lg font-medium">No snippets found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
}