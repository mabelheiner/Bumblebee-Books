async function getData() {
    const response = await fetch('https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=v1OBR5VQay1gkrGZ8FVwvuxSUYFEG84A');
    let book_div = document.getElementById("aBook");
    let book_list = "";
    if (response.ok){
        data = await response.json()
        //console.log(data)
  
        const results = [];
        for (let x = 0; x < data.results.length; x++) {
          results.push(data.results[x].book_details[0].title);
        }
  
        //console.log("Results: ", results)
  
        for (let i = 0; i < results.length; i++){
            const details = await fetch('https://www.googleapis.com/books/v1/volumes?q=intitle:' + results[i] + '&filter=paid-ebooks&key=AIzaSyDfpv-I46KRDNwioegRR1fzS4eGPpVnVdk');
  
            const book_info = await details.json();
  
            console.log("Book info", book_info);
  
            if (book_info.totalItems > 0){
  
              book_list += `<div><img src=${book_info.items[0].volumeInfo.imageLinks.thumbnail} alt=${book_info.items[0].volumeInfo.title}><h2>` + book_info.items[0].volumeInfo.title + `</h2><i>` + book_info.items[0].saleInfo.listPrice.amount + `</i></div><br>`;
              //console.log(results[i]);
            }
        }

        book_div.innerHTML += book_list;
    }
    else {
        console.log("an error occurred");
    }
  }
  getData();