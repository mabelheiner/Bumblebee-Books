
var checkbox = document.querySelector("input[name=checkbox]");
const like_button = document.getElementById("like_button");

import { createClient } from "@supabase/supabase-js";
const supabase_url = import.meta.env.VITE_SUPABASE_URL;
const supabase_key = import.meta.env.VITE_SUPABASE_KEY;
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