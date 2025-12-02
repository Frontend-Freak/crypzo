import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://racamjrcostgoshrhtwk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhY2FtanJjb3N0Z29zaHJodHdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NzM3NTYsImV4cCI6MjA3OTU0OTc1Nn0.I68GW61sVDO-GK8BKdXJo2r5RQEIseh_BcCKGTp6H2o';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);