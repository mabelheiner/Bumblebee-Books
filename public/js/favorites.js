document.getElementById("like_button").style.background="green";

var checkbox = document.querySelector("input[name=checkbox]");
const like_button = document.getElementById("like_button");

import { createClient } from "@supabase/supabase-js";
const supabase_url = "https://yxwtaswbvkntphikyngm.supabase.co";
const supabase_key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4d3Rhc3didmtudHBoaWt5bmdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg2Nzg0MjksImV4cCI6MjAwNDI1NDQyOX0.LA1-d0pzxGUC9QCKh5knKK2035EsV0LbYv4T_kG-bI0";
const supabase = createClient(supabase_url, supabase_key);

checkbox.addEventListener('change', async function() {
    if (this.checked) {      
        const info = await supabase.auth.getSession()
        try {
            const userId = info.data.session.user.id
        } catch {
            // alert("You must be logged in");
            window.location.href = 'http://localhost:5173/views/account/login.html';
        }

        const { data, error } = await supabase
            .from('favorites')
            .insert([
                { user_id: userId, book_id: 'YAY0DwAAQBAJ' },
            ])
            .select()
    } else {
        console.log("Checkbox is not checked..");
    }
});


