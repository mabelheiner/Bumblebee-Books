import { createClient } from "@supabase/supabase-js";
const supabase_url = "https://yxwtaswbvkntphikyngm.supabase.co";
const supabase_key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4d3Rhc3didmtudHBoaWt5bmdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg2Nzg0MjksImV4cCI6MjAwNDI1NDQyOX0.LA1-d0pzxGUC9QCKh5knKK2035EsV0LbYv4T_kG-bI0";
const supabase = createClient(supabase_url, supabase_key);
const info = await supabase.auth.getSession()


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



