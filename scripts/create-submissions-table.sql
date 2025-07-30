-- Create submissions table for storing form data
CREATE TABLE IF NOT EXISTS submissions (
  id SERIAL PRIMARY KEY,
  client_name VARCHAR(255) NOT NULL,
  channel_name VARCHAR(255) NOT NULL,
  content_type VARCHAR(50) NOT NULL,
  creative_freedom BOOLEAN NOT NULL,
  vision TEXT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  email_sent BOOLEAN DEFAULT FALSE
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_submissions_submitted_at ON submissions(submitted_at);
