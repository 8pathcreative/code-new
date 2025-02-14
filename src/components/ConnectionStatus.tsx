import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ConnectionStatus() {
  return (
    <div className="flex flex-col items-center gap-4 text-center mb-8 max-w-lg mx-auto p-4 border rounded-lg bg-destructive/5">
      <div className="flex items-center gap-2 text-destructive">
        <AlertCircle className="h-5 w-5" />
        <span className="font-semibold">Connection Required</span>
      </div>
      <p className="text-sm text-muted-foreground">
        Please click the "Connect to Supabase" button in the top right corner to set up your database connection.
      </p>
      <div className="flex gap-4">
        <Button
          variant="default"
          size="sm"
          onClick={() => window.location.reload()}
          className="mt-2"
        >
          Refresh Page
        </Button>
      </div>
    </div>
  );
}