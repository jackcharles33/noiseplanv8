/*
  # Fix assessments table schema
  
  1. Changes
    - Drop existing table and recreate without user_id
    - Set up anonymous access policy
    
  2. Security
    - Enable RLS
    - Allow anonymous access for all operations
*/

-- Drop existing table and policies
DROP TABLE IF EXISTS assessments;

-- Create table without user_id
CREATE TABLE assessments (
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

-- Create anonymous access policy
CREATE POLICY "Allow anonymous access"
  ON assessments
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);