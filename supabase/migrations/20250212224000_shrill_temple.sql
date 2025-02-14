/*
  # Remove premium features

  1. Changes
    - Set all resources to non-premium
    - Set all resources to non-featured
    - Keep the tables but disable premium functionality
*/

-- Set all resources to non-premium and non-featured
UPDATE resources
SET 
  is_premium = false,
  is_featured = false;