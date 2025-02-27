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
import { useAuth } from '@/hooks/useAuth';

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
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
        if (isSignUp) {
          await signUp(email, password, name);
          toast.success('Account created successfully');
        } else {
          await signIn(email, password);
          toast.success('Signed in successfully');
        }
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
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              {isSignUp && (
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? 'Processing...'
                : user
                ? 'Sign out'
                : isSignUp
                ? 'Create account'
                : 'Sign in'}
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