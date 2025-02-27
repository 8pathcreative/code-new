import React, { useState, useEffect } from 'react';
import { SEO } from '@/components/SEO';
import { SnippetsList } from '@/components/Snippets';

// Example snippets with more realistic code samples
const EXAMPLE_SNIPPETS = [
  {
    id: '1',
    title: 'React useState Hook',
    description: 'A complete example of using the useState hook with TypeScript',
    language: 'tsx',
    code: `import React, { useState } from 'react';

interface CounterProps {
  initialCount?: number;
}

export const Counter = ({ initialCount = 0 }: CounterProps) => {
  // useState with type inference
  const [count, setCount] = useState(initialCount);
  
  // useState with explicit typing
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const increment = () => {
    setCount(prevCount => prevCount + 1);
    setStatus('success');
  };
  
  const decrement = () => {
    setCount(prevCount => prevCount - 1);
    setStatus('success');
  };
  
  return (
    <div className="flex flex-col items-center">
      <p>Count: {count}</p>
      <p>Status: {status}</p>
      <div className="flex gap-2 mt-2">
        <button onClick={decrement}>-</button>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
};`,
    tags: ['react', 'hooks', 'typescript'],
    createdAt: '2023-10-15T12:00:00Z',
    updatedAt: '2023-10-15T12:00:00Z',
  },
  {
    id: '2',
    title: 'CSS Grid Layout',
    description: 'Responsive grid layout with named template areas',
    language: 'css',
    code: `.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1rem;
  padding: 1rem;
}

@media (min-width: 768px) {
  .container {
    grid-template-areas:
      "header header header"
      "sidebar main main"
      "footer footer footer";
    grid-template-columns: 200px 1fr 1fr;
    grid-template-rows: auto 1fr auto;
    grid-gap: 1.5rem;
    height: 100vh;
  }

  .header {
    grid-area: header;
    background-color: #f0f0f0;
    padding: 1rem;
  }

  .sidebar {
    grid-area: sidebar;
    background-color: #e0e0e0;
    padding: 1rem;
  }

  .main {
    grid-area: main;
    background-color: #ffffff;
    padding: 1rem;
  }

  .footer {
    grid-area: footer;
    background-color: #d0d0d0;
    padding: 1rem;
  }
}`,
    tags: ['css', 'grid', 'responsive', 'layout'],
    createdAt: '2023-11-10T09:30:00Z',
    updatedAt: '2023-12-12T14:15:00Z',
  },
  {
    id: '3',
    title: 'API Request Wrapper',
    description: 'A TypeScript wrapper for fetch API with error handling and typing',
    language: 'typescript',
    code: `interface ApiOptions extends RequestInit {
  params?: Record<string, string>;
  timeout?: number;
}

interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
  status: number;
}

export async function apiRequest<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<ApiResponse<T>> {
  const { params, timeout = 8000, ...fetchOptions } = options;
  
  // Add query parameters if provided
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, value);
    });
    endpoint = \`\${endpoint}?\${searchParams.toString()}\`;
  }
  
  // Set up timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
      signal: controller.signal,
      ...fetchOptions,
    });
    
    clearTimeout(timeoutId);
    
    // Handle HTTP errors
    if (!response.ok) {
      return {
        data: null,
        error: new Error(\`API error: \${response.status} \${response.statusText}\`),
        status: response.status,
      };
    }
    
    // Parse JSON response
    const data = await response.json() as T;
    
    return {
      data,
      error: null,
      status: response.status,
    };
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      return {
        data: null,
        error: new Error('API request timed out'),
        status: 408, // Request Timeout
      };
    }
    
    return {
      data: null,
      error: error instanceof Error ? error : new Error(String(error)),
      status: 0, // Network error
    };
  }
}

// Usage example:
// const { data, error } = await apiRequest<User[]>('/api/users', { params: { role: 'admin' } });`,
    tags: ['typescript', 'fetch', 'api'],
    createdAt: '2023-12-05T16:45:00Z',
    updatedAt: '2024-01-05T16:45:00Z',
  },
];

export function SnippetsPage() {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API fetch with a delay
    const fetchSnippets = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setSnippets(EXAMPLE_SNIPPETS);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError('Failed to load snippets');
        setLoading(false);
      }
    };

    fetchSnippets();
  }, []);

  return (
    <>
      <SEO 
        title="Code Snippets"
        description="Browse and search through our collection of useful code snippets for web development"
      />
      
      <div className="bg-background min-h-screen">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">Code Snippets</h1>
            <p className="text-muted-foreground mb-8">
              A collection of reusable code snippets for web development
            </p>
            
            <SnippetsList 
              snippets={snippets}
              isLoading={loading}
              error={error}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SnippetsPage;