/*
  # Fix analytics tracking functions

  1. Changes
    - Drop existing functions before recreating them
    - Fix parameter naming in rate limiting function
    - Update function implementations with proper error handling
*/

-- Drop existing functions first
DROP FUNCTION IF EXISTS check_rate_limit(text, text, integer, integer);
DROP FUNCTION IF EXISTS increment_resource_views(uuid, text);
DROP FUNCTION IF EXISTS increment_resource_clicks(uuid, text);

-- Create rate limiting function
CREATE OR REPLACE FUNCTION check_rate_limit(
  p_client_ip text,
  p_action_type text,
  p_max_requests int DEFAULT 100,
  p_window_minutes int DEFAULT 5
)
RETURNS boolean
LANGUAGE plpgsql
AS $$
DECLARE
  recent_requests int;
BEGIN
  recent_requests := (
    SELECT COUNT(*)
    FROM resource_views rv
    WHERE rv.client_ip = p_client_ip
    AND rv.viewed_at > NOW() - (p_window_minutes || ' minutes')::interval
  );
  
  RETURN recent_requests < p_max_requests;
END;
$$;

-- Create increment_resource_views function
CREATE OR REPLACE FUNCTION increment_resource_views(
  p_resource_id uuid,
  p_client_ip text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  lock_id bigint;
BEGIN
  -- Validate input
  IF p_resource_id IS NULL THEN
    RAISE EXCEPTION 'resource_id cannot be null';
  END IF;

  -- Check if resource exists
  IF NOT EXISTS (SELECT 1 FROM resources WHERE id = p_resource_id) THEN
    RAISE EXCEPTION 'Resource not found';
  END IF;

  -- Rate limiting
  IF p_client_ip IS NOT NULL AND NOT check_rate_limit(p_client_ip, 'view') THEN
    RAISE EXCEPTION 'Rate limit exceeded';
  END IF;

  -- Generate lock ID from resource_id
  lock_id := ('x' || substr(p_resource_id::text, 1, 16))::bit(64)::bigint;
  
  -- Acquire advisory lock
  PERFORM pg_advisory_xact_lock(lock_id);
  
  -- Increment views
  UPDATE resources
  SET views = views + 1
  WHERE id = p_resource_id;
END;
$$;

-- Create increment_resource_clicks function
CREATE OR REPLACE FUNCTION increment_resource_clicks(
  p_resource_id uuid,
  p_client_ip text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  lock_id bigint;
BEGIN
  -- Validate input
  IF p_resource_id IS NULL THEN
    RAISE EXCEPTION 'resource_id cannot be null';
  END IF;

  -- Check if resource exists
  IF NOT EXISTS (SELECT 1 FROM resources WHERE id = p_resource_id) THEN
    RAISE EXCEPTION 'Resource not found';
  END IF;

  -- Rate limiting
  IF p_client_ip IS NOT NULL AND NOT check_rate_limit(p_client_ip, 'click') THEN
    RAISE EXCEPTION 'Rate limit exceeded';
  END IF;

  -- Generate lock ID from resource_id
  lock_id := ('x' || substr(p_resource_id::text, 1, 16))::bit(64)::bigint;
  
  -- Acquire advisory lock
  PERFORM pg_advisory_xact_lock(lock_id);
  
  -- Increment clicks
  UPDATE resources
  SET clicks = clicks + 1
  WHERE id = p_resource_id;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION check_rate_limit TO public;
GRANT EXECUTE ON FUNCTION increment_resource_views TO public;
GRANT EXECUTE ON FUNCTION increment_resource_clicks TO public;