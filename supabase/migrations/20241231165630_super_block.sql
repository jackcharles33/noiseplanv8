/*
  # Remove storage functionality

  1. Changes
    - Remove report_url column from assessments table
    - Remove storage objects and bucket
    - Remove storage policies
*/

-- Remove report_url column
ALTER TABLE assessments DROP COLUMN IF EXISTS report_url;

-- Remove storage policies
DROP POLICY IF EXISTS "Public Storage Access" ON storage.objects;
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;

-- Delete objects in the bucket first
DELETE FROM storage.objects WHERE bucket_id = 'assessment-reports';

-- Now we can safely delete the bucket
DELETE FROM storage.buckets WHERE id = 'assessment-reports';