-- Add Instagram support: opt-in column and activity type

-- Add instagram_opt_in to contacts
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS instagram_opt_in BOOLEAN NOT NULL DEFAULT false;

-- Update activities type check constraint to include 'instagram'
ALTER TABLE activities DROP CONSTRAINT IF EXISTS activities_type_check;
ALTER TABLE activities ADD CONSTRAINT activities_type_check
  CHECK (type IN ('email', 'whatsapp', 'instagram', 'call', 'meeting', 'note', 'stage_change'));
