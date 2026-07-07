import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rciqnlhudebtstgcnrnm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjaXFubGh1ZGVidHN0Z2Nucm5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0NDI1MjYsImV4cCI6MjA5OTAxODUyNn0.6BwGo8aEsJm89aMg0_gU14NyyrEpONMtkULDQ3-N-bs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
})
