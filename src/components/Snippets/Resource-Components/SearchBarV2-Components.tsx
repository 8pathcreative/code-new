import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchResult {
  id: string;
  title: string;
  type: string;
  category: string;
}

interface SearchBarProps {
  onSearch: (query: string) => void;
  searchResults?: SearchResult[];
  onResultSelect?: (result: SearchResult) => void;
  isLoading?: boolean;
  className?: string;
}

export function SearchBar({ 
  onSearch, 
  searchResults = [], 
  onResultSelect,
  isLoading = false,
  className 
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    if (searchQuery.length === 0) {
      setOpen(false);
    } else if (searchQuery.length > 1) {
      setOpen(true);
      onSearch(searchQuery);
    }
  }, [searchQuery, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClear = () => {
    setSearchQuery('');
    setOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    if (onResultSelect) {
      onResultSelect(result);
      setSearchQuery('');
      setOpen(false);
    }
  };

  return (
    <div className={cn("relative flex w-full items-center", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="search"
              placeholder="Search for resources..."
              className="pl-9 pr-10 w-full"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full aspect-square rounded-l-none"
                onClick={handleClear}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear</span>
              </Button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent 
          className="w-[calc(100vw-2rem)] sm:w-[400px] p-0"
          align="start"
          sideOffset={4}
        >
          <Command>
            <CommandInput placeholder="Search resources..." value={searchQuery} onValueChange={setSearchQuery} />
            <CommandList>
              {isLoading ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  Loading results...
                </div>
              ) : (
                <>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Resources">
                    {searchResults.map((result) => (
                      <CommandItem 
                        key={result.id}
                        onSelect={() => handleResultClick(result)}
                        className="flex flex-col items-start"
                      >
                        <div className="text-sm">{result.title}</div>
                        <div className="text-xs text-muted-foreground flex gap-2">
                          <span className="capitalize">{result.type}</span>
                          <span>•</span>
                          <span>{result.category}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}