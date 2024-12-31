/*
  # Update assessments table for anonymous access
  
  1. Changes
    - Remove user_id foreign key constraint
    - Update RLS policies to allow anonymous access
    
  2. Security
    - Enable RLS
    - Allow anonymous read/write access
*/

-- Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sound_power numeric NOT NULL,
  directivity numeric NOT NULL,
  distance numeric NOT NULL,
  barrier numeric NOT NULL,
  final_level numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  
  CONSTRAINT sound_power_range CHECK (sound_power >= 0 AND sound_power <= 100),
  CONSTRAINT directivity_valid CHECK (directivity IN (2, 4, 8)),
  CONSTRAINT distance_range CHECK (distance >= 1 AND distance <= 30),
  CONSTRAINT barrier_valid CHECK (barrier IN (0, -5, -10))
);

-- Enable RLS
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can create their own assessments" ON assessments;
DROP POLICY IF EXISTS "Users can read their own assessments" ON assessments;
DROP POLICY IF EXISTS "Allow anonymous access" ON assessments;

-- Create new policy for anonymous access
CREATE POLICY "Allow anonymous access"
  ON assessments
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);