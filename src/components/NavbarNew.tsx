"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes"; 
import { MoonIcon, SunIcon } from "lucide-react"; // Optional: for better icons

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            >
              huly
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-8">
                <Link href="/playground" className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                  Playground
                </Link>
                <Link href="/about" className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                  About
                </Link>
                <Link href="/contact" className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                  Contact
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-sm text-gray-700 dark:text-gray-300">
              <Link href="/login">Login</Link>
            </Button>
            <Button className="text-sm bg-gradient-to-r from-primary to-accent hover:opacity-90">
              <Link href="/signup">Sign Up</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-gray-700 dark:text-gray-300"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <MoonIcon className="h-5 w-5" />
              ) : (
                <SunIcon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}