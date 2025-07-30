-- Add client_email column to existing submissions table
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS client_email VARCHAR(255);

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_submissions_client_email ON submissions(client_email);
