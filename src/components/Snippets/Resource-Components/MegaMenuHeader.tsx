import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from '@/hooks/use-theme';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

// Define navigation links with mega menu structure
const components: { title: string; href: string; description: string }[] = [
  {
    title: "React Components",
    href: "/resources/react",
    description: "Modern React components with hooks and TypeScript",
  },
  {
    title: "UI Libraries",
    href: "/resources/ui",
    description: "Popular UI libraries for web development",
  },
  {
    title: "State Management",
    href: "/resources/state",
    description: "Redux, Context API, Zustand and more",
  },
  {
    title: "Styling Solutions",
    href: "/resources/styling",
    description: "CSS-in-JS, Tailwind, and other styling approaches",
  },
];

const tutorials: { title: string; href: string; description: string }[] = [
  {
    title: "Beginner Guides",
    href: "/tutorials/beginner",
    description: "Get started with web development fundamentals",
  },
  {
    title: "Advanced Topics",
    href: "/tutorials/advanced",
    description: "Deep dive into complex development concepts",
  },
  {
    title: "Video Courses",
    href: "/tutorials/videos",
    description: "Curated video tutorials from top educators",
  },
  {
    title: "Interactive Workshops",
    href: "/tutorials/workshops",
    description: "Hands-on learning experiences to build your skills",
  },
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link to="/" className="hidden items-center space-x-2 md:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            <span className="font-bold">Code Tutorials</span>
          </Link>
          
          <button className="flex items-center space-x-2 md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
            <span className="font-bold">Menu</span>
          </button>
          
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] grid-cols-2 p-6 gap-3">
                    <div className="col-span-2">
                      <div className="mb-2 mt-4 text-lg font-medium">Components & Libraries</div>
                      <p className="text-sm leading-snug text-muted-foreground mb-3">
                        Explore our curated collection of development resources, libraries and tools
                      </p>
                    </div>
                    <ul className="grid w-full gap-3 p-2">
                      {components.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                    <div>
                      <div className="rounded-md bg-muted p-4">
                        <div className="mb-2 font-medium">Staff Picks</div>
                        <ul className="space-y-2 text-sm">
                          <li>
                            <Link to="/resources/nextjs" className="text-muted-foreground hover:text-foreground transition-colors">
                              Next.js Starter Templates
                            </Link>
                          </li>
                          <li>
                            <Link to="/resources/shadcn" className="text-muted-foreground hover:text-foreground transition-colors">
                              shadcn/ui Components
                            </Link>
                          </li>
                          <li>
                            <Link to="/resources/typescript" className="text-muted-foreground hover:text-foreground transition-colors">
                              TypeScript Project Setup
                            </Link>
                          </li>
                          <li>
                            <Link to="/resources/trending" className="text-muted-foreground hover:text-foreground transition-colors">
                              Trending This Week
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Tutorials</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] grid-cols-2 p-6">
                    <ul className="grid gap-3 p-4">
                      {tutorials.map((tutorial) => (
                        <ListItem
                          key={tutorial.title}
                          title={tutorial.title}
                          href={tutorial.href}
                        >
                          {tutorial.description}
                        </ListItem>
                      ))}
                    </ul>
                    <div className="flex h-full w-full flex-col justify-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none">
                      <div className="mb-2 mt-4 text-lg font-medium">New Course</div>
                      <p className="text-sm leading-tight text-muted-foreground mb-3">
                        Master Fullstack Development with our latest comprehensive course
                      </p>
                      <Button asChild className="mt-4">
                        <Link to="/tutorials/fullstack">Get Started →</Link>
                      </Button>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/pricing" className={navigationMenuTriggerStyle()}>
                    Pricing
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/blog" className={navigationMenuTriggerStyle()}>
                    Blog
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="flex items-center gap-4">
          <form className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search resources..."
                className="w-[200px] pl-8 md:w-[250px] rounded-full bg-muted"
              />
            </div>
          </form>
          
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>
          
          <Button size="sm" className="hidden md:flex">
            Sign In
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background pt-16 top-16 border-t">
          <div className="container grid gap-6 pb-8 pt-6 md:hidden">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search resources..."
                  className="w-full pl-8 bg-muted"
                />
              </div>
            </form>
            <div className="grid grid-flow-row auto-rows-max text-sm">
              <h4 className="font-medium leading-none mb-2">Resources</h4>
              {components.map((component) => (
                <Link
                  key={component.title}
                  to={component.href}
                  className="flex py-2 text-muted-foreground"
                >
                  {component.title}
                </Link>
              ))}
              
              <h4 className="font-medium leading-none mb-2 mt-6">Tutorials</h4>
              {tutorials.map((tutorial) => (
                <Link
                  key={tutorial.title}
                  to={tutorial.href}
                  className="flex py-2 text-muted-foreground"
                >
                  {tutorial.title}
                </Link>
              ))}
              
              <div className="border-t my-4"></div>
              
              <Link to="/pricing" className="flex py-2">
                Pricing
              </Link>
              <Link to="/blog" className="flex py-2">
                Blog
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              <Button className="w-full">Sign In</Button>
              <Button variant="outline" className="w-full">Create Account</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";