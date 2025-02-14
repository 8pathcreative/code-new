/*
  # Add premium features and analytics

  1. New Tables
    - `resource_views` - Track resource view analytics
    - `resource_clicks` - Track resource click analytics
    - `plans` - Available subscription plans
    - `user_subscriptions` - User subscription status

  2. Changes
    - Add premium and featured columns to resources table
    - Add affiliate URL to resources
    - Add analytics columns to resources

  3. Security
    - Enable RLS on all new tables
    - Add policies for authenticated users
*/

-- Add new columns to resources
ALTER TABLE resources ADD COLUMN IF NOT EXISTS is_premium boolean DEFAULT false;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS affiliate_url text;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS views integer DEFAULT 0;
ALTER TABLE resources ADD COLUMN IF NOT EXISTS clicks integer DEFAULT 0;

-- Create plans table
CREATE TABLE plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  interval text NOT NULL CHECK (interval IN ('month', 'year')),
  features jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

-- Create user subscriptions table
CREATE TABLE user_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  plan_id uuid REFERENCES plans NOT NULL,
  status text NOT NULL CHECK (status IN ('active', 'canceled', 'expired')),
  current_period_end timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create resource views table
CREATE TABLE resource_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id uuid REFERENCES resources NOT NULL,
  user_id uuid REFERENCES auth.users,
  viewed_at timestamptz DEFAULT now()
);

-- Create resource clicks table
CREATE TABLE resource_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id uuid REFERENCES resources NOT NULL,
  user_id uuid REFERENCES auth.users,
  clicked_at timestamptz DEFAULT now(),
  source text NOT NULL
);

-- Enable RLS
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_clicks ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read access to plans"
  ON plans FOR SELECT TO public
  USING (true);

CREATE POLICY "Users can read their own subscriptions"
  ON user_subscriptions FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own views"
  ON resource_views FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert their own clicks"
  ON resource_clicks FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Insert sample plans
INSERT INTO plans (name, description, price, interval, features) VALUES
  ('Free', 'Access to basic resources', 0, 'month', '["Basic resources", "Search functionality", "Category filtering"]'),
  ('Pro', 'Premium resources and features', 9, 'month', '["All Free features", "Premium resources", "Early access", "No ads", "Priority support"]'),
  ('Team', 'Perfect for organizations', 49, 'month', '["All Pro features", "Team collaboration", "API access", "Custom collections", "Dedicated support"]');

-- Update some resources as premium
UPDATE resources
SET is_premium = true
WHERE id IN (
  SELECT id FROM resources
  ORDER BY RANDOM()
  LIMIT 3
);

-- Update some resources as featured
UPDATE resources
SET is_featured = true
WHERE id IN (
  SELECT id FROM resources
  ORDER BY RANDOM()
  LIMIT 2
);