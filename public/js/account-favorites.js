import { createClient } from "@supabase/supabase-js";
const supabase_url = import.meta.env.VITE_SUPABASE_URL;
const supabase_key = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabase_url, supabase_key);
const info = await supabase.auth.getSession()

if(info.data.session == null) {
  let main = document.querySelector("main");
  main.innerHTML = "<button id='login-on-favs-button'><a href='http://localhost:5173/views/account/login.html'>Log In to View This Page</a></button>";
  let message = document.body.appendChild(document.createElement("div"))
  // window.location.href = 'http://localhost:5173/views/account/login.html';
  // alert("Please log in");
}

let { data: favorites, error } = await supabase
  .from('favorites')
  .select("*")
  .eq('user_id', info.data.session.user.id)

console.log(favorites);

let main = document.querySelector("main");
main.setAttribute('id', "aBook");
main.innerHTML = "";
let message = document.body.appendChild(document.createElement("div"))

if(favorites.length == 0){
  main.innerHTML = "<p>It looks like you don't have any favorites!</p>";
}

favorites.forEach(async book => {
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes/` + book.book_id);
  
  if (response){
      let results = await response.json()

      const price = formatter.format(results.saleInfo.listPrice.amount)

      let book_div = main.appendChild(document.createElement('div'));
      book_div.classList.add("book");

      book_div.innerHTML += `<a href="/views/single_book_view/index.html?cover=${results.volumeInfo.imageLinks.thumbnail}&title=${results.volumeInfo.title}&author=${results.volumeInfo.authors[0]}&length=${results.volumeInfo.pageCount}&publishedDate=${results.volumeInfo.publishedDate}&description=${encodeURIComponent(results.volumeInfo.description)}&price=${results.saleInfo.listPrice.amount}"><img src=${results.volumeInfo.imageLinks.thumbnail} alt=${results.volumeInfo.title}><h2>` + results.volumeInfo.title + `</h2><i>` + results.volumeInfo.authors[0] + `</i><p>` + results.volumeInfo.averageRating + '★</p><p>' + results.volumeInfo.categories[0] + `</p><br><p>` + price + `</a>`;
  
      
  }
  else {
      message.innerHTML = `<p>An error occurred</p>`;
  }
});

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});



