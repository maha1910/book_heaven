import { createClient } from "@supabase/supabase-js";
import 'react-native-url-polyfill/auto';

const SUPABASE_URL = "https://xqfxdtcshbzkfmvdcdmg.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxZnhkdGNzaGJ6a2ZtdmRjZG1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1NzQ1MzAsImV4cCI6MjA1NzE1MDUzMH0.mTC8XLiLdgcCWtlNWETE_gApMPUTfJw9J4yZPVQ-LgU";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Function to check if a user is logged in
export const checkUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
        console.error("Error fetching user data:", error.message);
        return null;
    }
    console.log("User Data:", data);
    return data;
};

// Function to track user logins in the database
export const trackLogin = async (userId) => {
    const { data, error } = await supabase
        .from("logins")
        .insert([{ user_id: userId, timestamp: new Date() }]);
    
    if (error) {
        console.error("Error logging user login:", error.message);
    } else {
        console.log("User login recorded:", data);
    }
};

// Function to fetch total login count
export const fetchLoginCount = async () => {
    const { count, error } = await supabase
        .from("logins")
        .select("*", { count: "exact", head: true });
    
    if (error) {
        console.error("Error fetching login count:", error.message);
    } else {
        console.log(`Total Logged-in Users: ${count}`);
    }
};

// Function to fetch total number of reviews
export const fetchReviewCount = async () => {
    const { count, error } = await supabase
        .from("reviews")
        .select("*", { count: "exact", head: true });
    
    if (error) {
        console.error("Error fetching review count:", error.message);
    } else {
        console.log(`Total Reviews: ${count}`);
    }
};
