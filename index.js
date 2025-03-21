import { registerRootComponent } from 'expo';
import { supabase } from './supabaseConfig'; // Corrected import
import App from './App';

// Ensure the app is registered correctly in both Expo Go and native builds
registerRootComponent(App);
