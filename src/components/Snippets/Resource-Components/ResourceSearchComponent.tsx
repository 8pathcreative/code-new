import React, { useState } from 'react';
import { 
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon, XIcon } from 'lucide-react';

interface ResourceSearchProps {
  onSearch: (query: string) => void;
  query: string;
}

export function ResourceSearch({ onSearch, query }: ResourceSearchProps) {
  const [inputValue, setInputValue] = useState(query);
  const [open, setOpen] = useState(false);
  
  const handleSearch = (value: string) => {
    setInputValue(value);
    onSearch(value);
  };
  
  const clearSearch = () => {
    setInputValue('');
    onSearch('');
  };
  
  // Common search suggestions
  const suggestions = [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Design Systems",
    "API Tools",
    "Animation Libraries"
  ];
  
  return (
    <div className="relative">
      {/* Desktop search bar */}
      <div className="relative hidden md:flex">
        <Input
          placeholder="Search resources, libraries, tools..."
          value={inputValue}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-10 h-12"
        />
        <SearchIcon className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
        {inputValue && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground"
          >
            <XIcon className="h-5 w-5" />
          </button>
        )}
      </div>
      
      {/* Mobile optimized command menu */}
      <div className="flex md:hidden">
        <Button
          variant="outline"
          className="w-full justify-between text-muted-foreground h-12 px-4"
          onClick={() => setOpen(true)}
        >
          <div className="flex items-center">
            <SearchIcon className="mr-2 h-4 w-4" />
            {inputValue || "Search resources..."}
          </div>
          <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            ⌘K
          </kbd>
        </Button>

        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command>
            <CommandInput 
              placeholder="Search resources..." 
              value={inputValue}
              onValueChange={handleSearch}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                {suggestions.map((suggestion) => (
                  <CommandItem 
                    key={suggestion}
                    onSelect={() => {
                      handleSearch(suggestion);
                      setOpen(false);
                    }}
                  >
                    {suggestion}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </div>
      
      {/* Search suggestions */}
      <div className="flex flex-wrap gap-2 mt-3">
        <span className="text-sm text-muted-foreground">Popular:</span>
        {suggestions.slice(0, 5).map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => handleSearch(suggestion)}
            className="text-sm text-primary hover:underline"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}