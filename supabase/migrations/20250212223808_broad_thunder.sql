/*
  # Add analytics functions

  1. New Functions
    - increment_resource_views - Safely increment view count
    - increment_resource_clicks - Safely increment click count

  These functions use advisory locks to prevent race conditions
  when multiple users view or click resources simultaneously.
*/

-- Function to increment resource views
CREATE OR REPLACE FUNCTION increment_resource_views(resource_id uuid)
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
  lock_id bigint := ('x' || substr(resource_id::text, 1, 16))::bit(64)::bigint;
BEGIN
  -- Acquire advisory lock
  PERFORM pg_advisory_xact_lock(lock_id);
  
  UPDATE resources
  SET views = views + 1
  WHERE id = resource_id;
END;
$$;

-- Function to increment resource clicks
CREATE OR REPLACE FUNCTION increment_resource_clicks(resource_id uuid)
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
  lock_id bigint := ('x' || substr(resource_id::text, 1, 16))::bit(64)::bigint;
BEGIN
  -- Acquire advisory lock
  PERFORM pg_advisory_xact_lock(lock_id);
  
  UPDATE resources
  SET clicks = clicks + 1
  WHERE id = resource_id;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION increment_resource_views TO authenticated;
GRANT EXECUTE ON FUNCTION increment_resource_clicks TO authenticated;