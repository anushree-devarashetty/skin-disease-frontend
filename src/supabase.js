import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  "https://mweiktvifcuyjdtqavug.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13ZWlrdHZpZmN1eWpkdHFhdnVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwMTA1MDAsImV4cCI6MjA4NTU4NjUwMH0.jkgH1y8YE0w_BHc9Y2VNSw161DUpFIVJmqL1rVNHP38"
)
