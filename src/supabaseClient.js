import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://fruqkfhrcdzymomvokhh.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZydXFrZmhyY2R6eW1vbXZva2hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2MjU3MTcsImV4cCI6MjA3NDIwMTcxN30.AGWhH-eXM0YGDYXz7KjBnM-d0WKENqxAbUj4Q3UDDAc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
