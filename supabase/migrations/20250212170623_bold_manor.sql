/*
  # Resources Directory Schema

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text) - Category name (e.g., Design, Development)
      - `slug` (text) - URL-friendly version of name
      - `created_at` (timestamp)
    
    - `resources`
      - `id` (uuid, primary key)
      - `title` (text) - Resource title
      - `description` (text) - Resource description
      - `url` (text) - Resource URL
      - `category_id` (uuid) - Foreign key to categories
      - `created_at` (timestamp)
      - `icon` (text) - Icon name from Lucide icons

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
*/

-- Create categories table
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Create resources table
CREATE TABLE resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  url text NOT NULL,
  category_id uuid REFERENCES categories(id),
  created_at timestamptz DEFAULT now(),
  icon text NOT NULL DEFAULT 'link'
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Allow public read access to categories"
  ON categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to resources"
  ON resources
  FOR SELECT
  TO public
  USING (true);

-- Insert initial categories
INSERT INTO categories (name, slug) VALUES
  ('Design', 'design'),
  ('Development', 'development'),
  ('UI/UX', 'ui-ux'),
  ('Tools', 'tools'),
  ('Resources', 'resources');

-- Insert sample resources
INSERT INTO resources (title, description, url, category_id, icon)
SELECT 
  'Design System Guidelines',
  'Comprehensive guide for creating and maintaining design systems',
  'https://example.com/design-systems',
  id,
  'palette'
FROM categories WHERE slug = 'design';

INSERT INTO resources (title, description, url, category_id, icon)
SELECT 
  'React Best Practices',
  'Collection of React patterns and best practices',
  'https://example.com/react-best-practices',
  id,
  'code'
FROM categories WHERE slug = 'development';

INSERT INTO resources (title, description, url, category_id, icon)
SELECT 
  'UI/UX Fundamentals',
  'Essential principles of user interface and experience design',
  'https://example.com/ui-ux-fundamentals',
  id,
  'layout'
FROM categories WHERE slug = 'ui-ux';