// src/pages/Playground.tsx
import React, { useState } from 'react';
import { SEO } from '@/components/SEO';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { 
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const Playground = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <div className="container mx-auto p-8">
      <SEO title="UI Components Playground" description="Test various UI components" />
      
      <h1 className="text-3xl font-bold mb-8">UI Components Playground</h1>
      
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Navigation Menu</h2>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                  <div className="p-4 rounded-md bg-muted">
                    <h3 className="font-medium mb-2">Introduction</h3>
                    <p className="text-sm text-muted-foreground">
                      Learn the basics of our platform and how to get started.
                    </p>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Documentation
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </section>
      
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Sheet</h2>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Menu className="mr-2 h-4 w-4" />
              Open Sheet
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                This is a side sheet panel for navigation or additional options.
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">Sheet content goes here</div>
          </SheetContent>
        </Sheet>
      </section>
      
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Command</h2>
        <div className="flex flex-col gap-4">
          <Button 
            variant="outline"
            onClick={() => setCommandOpen(true)}
          >
            Open Command Menu (Ctrl+K)
          </Button>
          
          <div className="border rounded-md p-4">
            <Command>
              <CommandInput placeholder="Type a command..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem>Profile</CommandItem>
                  <CommandItem>Settings</CommandItem>
                  <CommandItem>Help</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </div>
        
        <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
          <CommandInput placeholder="Search for anything..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Profile</CommandItem>
              <CommandItem>Settings</CommandItem>
              <CommandItem>Help</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </section>
      
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Popover</h2>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="space-y-2">
              <h3 className="font-medium">Popover Title</h3>
              <p className="text-sm text-muted-foreground">
                This is a popover component that can contain any content.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </section>
      
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Skeleton</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <Skeleton className="h-[200px] w-full" />
        </div>
      </section>
    </div>
  );
};

export default Playground;