import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tqxfrqzrlbmvegwmktvm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxeGZycXpybGJtdmVnd21rdHZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkzMjc3OTgsImV4cCI6MjA4NDkwMzc5OH0.P8-Mkb9I0uy904zxQCuZNoVYyY1N2OAbtgalu-erMQ8"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
