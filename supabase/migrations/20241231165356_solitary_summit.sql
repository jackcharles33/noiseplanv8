/*
  # Fix storage policies for report generation

  1. Changes
    - Add more permissive storage policies for public access
    - Enable upsert capabilities for reports
    - Allow public access to assessment reports bucket

  2. Security
    - Maintains public access to assessment reports
    - Enables report generation and storage functionality
*/

-- Ensure storage bucket exists and is public
INSERT INTO storage.buckets (id, name, public)
VALUES ('assessment-reports', 'assessment-reports', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public Storage Access" ON storage.objects;
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;

-- Create comprehensive storage policies
CREATE POLICY "Public Storage Access"
ON storage.objects FOR ALL
TO public
USING (bucket_id = 'assessment-reports')
WITH CHECK (bucket_id = 'assessment-reports');

CREATE POLICY "Allow public uploads"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'assessment-reports');