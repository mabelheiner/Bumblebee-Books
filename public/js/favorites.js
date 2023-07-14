
var checkbox = document.querySelector("input[name=checkbox]");
const like_button = document.getElementById("like_button");

import { createClient } from "@supabase/supabase-js";
const supabase_url = "https://yxwtaswbvkntphikyngm.supabase.co";
const supabase_key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4d3Rhc3didmtudHBoaWt5bmdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg2Nzg0MjksImV4cCI6MjAwNDI1NDQyOX0.LA1-d0pzxGUC9QCKh5knKK2035EsV0LbYv4T_kG-bI0";
const supabase = createClient(supabase_url, supabase_key);

checkbox.addEventListener('change', async function() {
    const info = await supabase.auth.getSession()
    if (this.checked) {      
        try {
            const urlParams = new URL(window.location.href).searchParams;
            const coverUrlParams = new URL(urlParams.get('cover')).searchParams;
            const bookId = coverUrlParams.get('id')
            const userId = info.data.session.user.id
            const { data, error } = await supabase
                .from('favorites')
                .insert([
                    { user_id: userId, book_id: bookId },
                ])
                .select()
                console.log("it worked....");
        } catch {
            window.location.href = 'http://localhost:5173/views/account/login.html';
        }

    } else {
        try {
            const urlParams = new URL(window.location.href).searchParams;
            const coverUrlParams = new URL(urlParams.get('cover')).searchParams;
            const bookId = coverUrlParams.get('id');
            const userId = info.data.session.user.id;

            console.log("past conditions")
            // Delete data based on the conditions
            const { data, error } = await supabase
            .from('favorites')
            .delete()
            .eq('user_id', userId)
            .like('book_id', bookId);

        } catch {
            window.location.href = 'http://localhost:5173/views/account/login.html';
        }
    }
});


// fetch url with id 
// https://www.googleapis.com/books/v1/volumes/YAY0DwAAQBAJ