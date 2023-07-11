import { createClient } from "@supabase/supabase-js";
 
const supabase_url = "https://yxwtaswbvkntphikyngm.supabase.co";
const supabase_key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4d3Rhc3didmtudHBoaWt5bmdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg2Nzg0MjksImV4cCI6MjAwNDI1NDQyOX0.LA1-d0pzxGUC9QCKh5knKK2035EsV0LbYv4T_kG-bI0";
 
const supabase = createClient(supabase_url, supabase_key);
 
window.onload = async function () {
  let { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "http://localhost:5173/views/cart/index.html",
    },
  });
};