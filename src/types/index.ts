// src/types/index.ts
export interface Snippet {
    id: string;
    title: string;
    code: string;
    language: string;
    created_at: string;
    user_id: string;
  }
  
  export interface User {
    id: string;
    email: string;
    profile?: {
      username: string;
      avatar_url: string;
    };
  }