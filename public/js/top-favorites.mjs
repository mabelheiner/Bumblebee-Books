const ny_api_key = import.meta.env.VITE_NY_API_KEY;
const google_books_api_key = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

async function getData() {
    const response = await fetch('https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=' + ny_api_key);
    let book_div = document.getElementById("aBook");
    book_div.innerHTML = "<p><i>Loading top favorites...</i></p>";
    let book_list = "";
    if (response.ok){
        const data = await response.json()
        //console.log(data)
        //Promise all and then map
  
        const results = [];
        for (let x = 0; x < data.results.length; x++) {
          results.push(data.results[x].book_details[0].title);
        }
  
        //console.log("Results: ", results)
  
        for (let i = 0; i < results.length && i < 10; i++){
            const details = await fetch('https://www.googleapis.com/books/v1/volumes?q=intitle:' + results[i] + '&filter=paid-ebooks&maxResults=40&key=' + google_books_api_key);
  
            const book_info = await details.json();
  
            console.log("Book info", book_info);
  
            if (book_info.totalItems > 0){
  
              //book_list += `<div><img src=${book_info.items[0].volumeInfo.imageLinks.thumbnail} alt=${book_info.items[0].volumeInfo.title}><h2>` + book_info.items[0].volumeInfo.title + `</h2><p>` + book_info.items[0].volumeInfo.authors[0] + `</p>` + `<i>$` + book_info.items[0].saleInfo.listPrice.amount + `</i></div><br>`;
              //console.log(book_info.items[0]);

              if (book_info.items[0].volumeInfo.averageRating){    
                if (book_info.items[0].saleInfo.listPrice.amount) {                    
                    book_list += `<div><a href="/views/single_book_view/index.html?cover=${book_info.items[0].volumeInfo.imageLinks.thumbnail}&title=${book_info.items[0].volumeInfo.title}&author=${book_info.items[0].volumeInfo.authors[0]}&length=${book_info.items[0].volumeInfo.pageCount}&publishedDate=${book_info.items[0].volumeInfo.publishedDate}&description=${encodeURIComponent(book_info.items[0].volumeInfo.description)}&price=${book_info.items[0].saleInfo.listPrice.amount}"><img src=${book_info.items[0].volumeInfo.imageLinks.thumbnail} alt=${book_info.items[0].volumeInfo.title}><h2>` + book_info.items[0].volumeInfo.title + `</h2><i>` + book_info.items[0].volumeInfo.authors[0] + `</i><p>` + book_info.items[0].volumeInfo.averageRating + '★</p><p>' + book_info.items[0].volumeInfo.categories[0] + `</p><br><p>$` + book_info.items[0].saleInfo.listPrice.amount + `</a></div>`;
                }
                else{
                    const price = 12.99;
                    book_list += `<div><a href="/views/single_book_view/index.html?cover=${book_info.items[0].volumeInfo.imageLinks.thumbnail}&title=${book_info.items[0].volumeInfo.title}&author=${book_info.items[0].volumeInfo.authors[0]}&length=${book_info.items[0].volumeInfo.pageCount}&publishedDate=${book_info.items[0].volumeInfo.publishedDate}&description=${encodeURIComponent(book_info.items[0].volumeInfo.description)}&price=${price}"><img src=${book_info.items[0].volumeInfo.imageLinks.thumbnail} alt=${book_info.items[0].volumeInfo.title}><h2>` + book_info.items[0].volumeInfo.title + `</h2>`+ `<i>` + book_info.items[0].volumeInfo.authors[0] + `</i><p>` + book_info.items[0].volumeInfo.averageRating + '★</p><p>' + book_info.items[0].volumeInfo.categories[0] + `</p><br><p>$` + price + `</p></a></div>`;
                
                }
            }
            }
        }

        book_div.innerHTML = book_list;
    }
    else {
      book_div.innerHTML = "<p>Sorry, unable to load top favorites at this time, please search for a book to find it.</p>";
    }
  }
  getData();