import { createClient } from "@supabase/supabase-js";
import 'react-native-url-polyfill/auto';

const SUPABASE_URL = "https://xqfxdtcshbzkfmvdcdmg.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxZnhkdGNzaGJ6a2ZtdmRjZG1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1NzQ1MzAsImV4cCI6MjA1NzE1MDUzMH0.mTC8XLiLdgcCWtlNWETE_gApMPUTfJw9J4yZPVQ-LgU";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const checkUser = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    console.log("User Data:", userData);
    console.log("User Error:", userError);
  };
  
  checkUser();