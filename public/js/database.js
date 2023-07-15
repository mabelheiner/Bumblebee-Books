import { createClient } from "@supabase/supabase-js";
 
const supabase_url = import.meta.env.VITE_SUPABASE_URL;
const supabase_key = import.meta.env.VITE_SUPABASE_KEY;

  const options = {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      // storage: true
    },
  }
const supabase = createClient(supabase_url, supabase_key);
 
// window.onload = async function () {
//   let { data, error } = await supabase.auth.signInWithOAuth({
//     provider: "github",
//     options: {
//       redirectTo: "http://localhost:5173/views/cart/index.html",
//     },
//   });
// };

const registrationForm = document.getElementById('registration-form');
if (registrationForm) {
  registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('sign-email').value;
    const password = document.getElementById('sign-password').value;
    try {
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        // options: {
        //   emailRedirectTo: 'http://localhost:5173/views/account/login.html'
        // }
      });
      if (error) {
        console.log('Registration error:', error);
        var messageElement = document.getElementById('sign-message');
        messageElement.textContent = 'Sorry something went wrong. You are not signed up.';
      } else {
        console.log('Registration successful:', data);
        window.location.href = 'http://localhost:5173/views/account/login.html';
        // var messageElement = document.getElementById('login-message');
        // messageElement.textContent = 'Registration was successful!';
      }
    } catch (error) {
      console.log('Error:', error);
    }
  });
}

const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    try {
      const { user, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        console.log('Login error:', error);
      } else {
        console.log('Login successful:', user);
        window.location.href = 'http://localhost:5173/views/account_favorites/index.html';
      }
    } catch (error) {
      console.log('Error:', error);
    }
  });
}

const logoutButton = document.getElementById('logout-button');
if (logoutButton) {
  logoutButton.addEventListener('click', async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log('Logout error:', error);
      } else {
        console.log('Logout successful');
        window.location.href = 'http://localhost:5173/';
      }
    } catch (error) {
      console.log('Error:', error);
    }
  });
}

  // console.log(await supabase.auth.getSession());


