import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, signIn, signUp, signOut } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (user) {
        await signOut();
        toast.success('Signed out successfully');
      } else {
        const authFunction = isSignUp ? signUp : signIn;
        await authFunction(email, password);
        toast.success(isSignUp ? 'Account created successfully' : 'Signed in successfully');
      }
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {user ? 'Account' : isSignUp ? 'Create an account' : 'Sign in to your account'}
          </DialogTitle>
          <DialogDescription>
            {user
              ? 'Manage your account settings'
              : isSignUp
              ? 'Create a new account to save and manage your resources'
              : 'Sign in to access your saved resources and settings'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {!user && (
            <>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none">
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium leading-none">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </>
          )}

          <DialogFooter>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Loading...' : user ? 'Sign Out' : isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </DialogFooter>
        </form>

        {!user && (
          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            </span>
            <Button
              variant="link"
              className="p-0 h-auto font-semibold"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}