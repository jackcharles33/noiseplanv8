-- Add report_url column
ALTER TABLE assessments
ADD COLUMN IF NOT EXISTS report_url TEXT;

-- Create storage bucket for reports if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('assessment-reports', 'assessment-reports', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Update Access" ON assessments;

-- Create new policies
CREATE POLICY "Public Access"
ON storage.objects FOR ALL
TO public
USING (bucket_id = 'assessment-reports')
WITH CHECK (bucket_id = 'assessment-reports');

CREATE POLICY "Public Upload Access"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'assessment-reports');

CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'assessment-reports');

CREATE POLICY "Public Update Access"
ON assessments FOR UPDATE
TO public
USING (true)
WITH CHECK (true);