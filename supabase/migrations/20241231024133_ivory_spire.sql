/*
  # Create assessments table for noise calculations

  1. New Tables
    - `assessments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `sound_power` (numeric, heat pump sound power)
      - `directivity` (numeric, installation factor)
      - `distance` (numeric, distance in meters)
      - `barrier` (numeric, barrier reduction)
      - `final_level` (numeric, calculated final noise level)
      - `created_at` (timestamp)
      
  2. Security
    - Enable RLS on `assessments` table
    - Add policies for authenticated users to:
      - Create their own assessments
      - Read their own assessments
*/

-- Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
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

-- Create policies
CREATE POLICY "Users can create their own assessments"
  ON assessments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their own assessments"
  ON assessments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);