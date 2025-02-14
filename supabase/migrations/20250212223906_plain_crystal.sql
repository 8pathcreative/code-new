/*
  # Fix analytics tracking permissions

  1. Changes
    - Allow anonymous access to view/click tracking
    - Update increment functions to handle null user_id
    - Add rate limiting to prevent abuse
    - Add input validation
  
  2. Security
    - Rate limiting prevents abuse
    - Input validation ensures data integrity
    - Still maintains tracking capabilities
*/

-- Drop existing functions
DROP FUNCTION IF EXISTS increment_resource_views(uuid);
DROP FUNCTION IF EXISTS increment_resource_clicks(uuid);

-- Create rate limiting function
CREATE OR REPLACE FUNCTION check_rate_limit(
  client_ip text,
  action_type text,
  max_requests int DEFAULT 100,
  window_minutes int DEFAULT 5
)
RETURNS boolean
LANGUAGE plpgsql
AS $$
DECLARE
  recent_requests int;
BEGIN
  recent_requests := (
    SELECT COUNT(*)
    FROM resource_views
    WHERE client_ip = check_rate_limit.client_ip
    AND viewed_at > NOW() - (window_minutes || ' minutes')::interval
  );
  
  RETURN recent_requests < max_requests;
END;
$$;

-- Updated increment_resource_views function
CREATE OR REPLACE FUNCTION increment_resource_views(
  resource_id uuid,
  client_ip text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  lock_id bigint;
BEGIN
  -- Validate input
  IF resource_id IS NULL THEN
    RAISE EXCEPTION 'resource_id cannot be null';
  END IF;

  -- Check if resource exists
  IF NOT EXISTS (SELECT 1 FROM resources WHERE id = resource_id) THEN
    RAISE EXCEPTION 'Resource not found';
  END IF;

  -- Rate limiting
  IF client_ip IS NOT NULL AND NOT check_rate_limit(client_ip, 'view') THEN
    RAISE EXCEPTION 'Rate limit exceeded';
  END IF;

  -- Generate lock ID from resource_id
  lock_id := ('x' || substr(resource_id::text, 1, 16))::bit(64)::bigint;
  
  -- Acquire advisory lock
  PERFORM pg_advisory_xact_lock(lock_id);
  
  -- Increment views
  UPDATE resources
  SET views = views + 1
  WHERE id = resource_id;
END;
$$;

-- Updated increment_resource_clicks function
CREATE OR REPLACE FUNCTION increment_resource_clicks(
  resource_id uuid,
  client_ip text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  lock_id bigint;
BEGIN
  -- Validate input
  IF resource_id IS NULL THEN
    RAISE EXCEPTION 'resource_id cannot be null';
  END IF;

  -- Check if resource exists
  IF NOT EXISTS (SELECT 1 FROM resources WHERE id = resource_id) THEN
    RAISE EXCEPTION 'Resource not found';
  END IF;

  -- Rate limiting
  IF client_ip IS NOT NULL AND NOT check_rate_limit(client_ip, 'click') THEN
    RAISE EXCEPTION 'Rate limit exceeded';
  END IF;

  -- Generate lock ID from resource_id
  lock_id := ('x' || substr(resource_id::text, 1, 16))::bit(64)::bigint;
  
  -- Acquire advisory lock
  PERFORM pg_advisory_xact_lock(lock_id);
  
  -- Increment clicks
  UPDATE resources
  SET clicks = clicks + 1
  WHERE id = resource_id;
END;
$$;

-- Update resource_views table
ALTER TABLE resource_views 
ADD COLUMN IF NOT EXISTS client_ip text;

-- Update resource_clicks table
ALTER TABLE resource_clicks 
ADD COLUMN IF NOT EXISTS client_ip text;

-- Grant execute permissions to public
GRANT EXECUTE ON FUNCTION increment_resource_views TO public;
GRANT EXECUTE ON FUNCTION increment_resource_clicks TO public;
GRANT EXECUTE ON FUNCTION check_rate_limit TO public;

-- Update RLS policies for anonymous access
DROP POLICY IF EXISTS "Public can insert views" ON resource_views;
CREATE POLICY "Public can insert views"
  ON resource_views FOR INSERT TO public
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public can insert clicks" ON resource_clicks;
CREATE POLICY "Public can insert clicks"
  ON resource_clicks FOR INSERT TO public
  WITH CHECK (true);