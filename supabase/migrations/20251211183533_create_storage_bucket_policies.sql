/*
  # Storage Bucket Setup for Website Images

  1. Bucket Configuration
    - Creates a public storage bucket named 'website-images'
    - Configured for public read access
  
  2. Security Policies
    - Public users can view all images in the bucket
    - Authenticated users can upload new images
    - Authenticated users can update existing images
    - Authenticated users can delete images
  
  3. Notes
    - The bucket is set to public to allow website visitors to view images
    - Upload/Update/Delete operations require authentication for security
*/

-- Create the storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('website-images', 'website-images', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Public read access for website images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload website images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update website images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete website images" ON storage.objects;

-- Allow public read access to all files in the website-images bucket
CREATE POLICY "Public read access for website images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'website-images');

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload website images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'website-images');

-- Allow authenticated users to update files
CREATE POLICY "Authenticated users can update website images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'website-images')
  WITH CHECK (bucket_id = 'website-images');

-- Allow authenticated users to delete files
CREATE POLICY "Authenticated users can delete website images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'website-images');
