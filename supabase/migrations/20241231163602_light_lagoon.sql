/*
  # Add report URL to assessments table

  1. Changes
    - Add report_url column to assessments table
    - Create storage bucket for reports
    - Enable storage policies for public access to reports
*/

-- Add report_url column
ALTER TABLE assessments
ADD COLUMN IF NOT EXISTS report_url TEXT;

-- Create storage bucket for reports
INSERT INTO storage.buckets (id, name, public)
VALUES ('assessment-reports', 'assessment-reports', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to reports
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'assessment-reports');