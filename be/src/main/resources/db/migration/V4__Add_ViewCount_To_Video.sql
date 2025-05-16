-- Add viewCount column to Video table
ALTER TABLE Video ADD COLUMN view_count BIGINT DEFAULT 0;

-- Update existing records to have a viewCount of 0
UPDATE Video SET view_count = 0 WHERE view_count IS NULL;