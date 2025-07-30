-- Add client_email column to existing submissions table
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS client_email VARCHAR(255);

-- Update the table to make client_email NOT NULL for future entries
-- (existing entries will have NULL values, but new ones will be required)
