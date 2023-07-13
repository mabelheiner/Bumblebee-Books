const google_books_api_key = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

let main = document.querySelector("main");
main.setAttribute('id', "aBook");

async function getBooks(){
    main.innerHTML = "";
    let message = document.body.appendChild(document.createElement("div"))
    const book_name = document.getElementById('book_name').value;

    if (book_name == ""){
        message.innerHTML = `<p>Please enter a valid book title</p>`;
    }
    else{
        message = "";
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${book_name}&download=epub&filter=ebooks&maxResults=40&key=` + google_books_api_key);
        if (response.ok){
            let data = await response.json()
            const results = data.items
            console.log(results)


            for (let i = 0; i < results.length; i++){
                let book_div = main.appendChild(document.createElement('div'));
                book_div.classList.add("book");

                let listPrice = results[i]?.saleInfo?.listPrice?.amount ?? 12.99;

                let author = results[i]?.volumeInfo?.authors ?? 'n/a';

                let category = results[i]?.volumeInfo?.categories ?? 'n/a';

                let averageRating = results[i]?.volumeInfo?.averageRating ?? 'n/a';

                let description = results[i]?.volumeInfo?.description ?? 'n/a';

                let title = results[i]?.volumeInfo?.title ?? 'n/a';

                let pageCount = results[i]?.volumeInfo?.pageCount ?? 'n/a';

                let publishedDate = results[i]?.volumeInfo?.publishedDate ?? 'n/a';

                console.log("Full details: ", results[i]);

                console.log("Price: ", results[i]?.saleInfo?.listPrice?.amount ?? 12.99);

                console.log("Author: ", results[i]?.volumeInfo?.authors ?? 'n/a');



                //console.log("Current book: ", results[i].volumeInfo.authors[0]);
                //console.log("results: ", typeof results[i].saleInfo.listPrice.amount);
                //console.log("result type: ", typeof results[i].saleInfo.listPrice.amount === "number");
                //console.log("testing: ", results[i].saleInfo.listPrice.amount !== "undefined");
                //console.log("List Price: ", listPrice);

                if (results[i].volumeInfo.averageRating){                       
                    if (true) {                    
                        book_div.innerHTML += `<a href="/views/single_book_view/index.html?cover=${results[i].volumeInfo.imageLinks.thumbnail}&title=${title}&author=${author}&length=${pageCount}&publishedDate=${publishedDate}&description=${encodeURIComponent(description)}&price=${listPrice}"><img src=${results[i].volumeInfo.imageLinks.thumbnail} alt=${title}><h2>` + title + `</h2><i>` + author + `</i><p>` + averageRating + '★</p><p>' + category + `</p><br><p>$` + listPrice + `</a>`;
                    }
                    else{
                        const price = 12.99;
                        book_div.innerHTML += `<a href="/views/single_book_view/index.html?cover=${results[i].volumeInfo.imageLinks.thumbnail}&title=${results[i].volumeInfo.title}&author=${author}&length=${results[i].volumeInfo.pageCount}&publishedDate=${results[i].volumeInfo.publishedDate}&description=${encodeURIComponent(results[i].volumeInfo.description)}&price=${listPrice}"><img src=${results[i].volumeInfo.imageLinks.thumbnail} alt=${results[i].volumeInfo.title}><h2>` + results[i].volumeInfo.title + `</h2>`+ `<i>` + results[i].volumeInfo.authors[0] + `</i><p>` + results[i].volumeInfo.averageRating + '★</p><p>' + results[i].volumeInfo.categories[0] + `</p><br><p>$` + price + `</p></a>`;
                    
                    }
                }

                else {
                    if (true){
                        book_div.innerHTML += `<a href="/views/single_book_view/index.html?cover=${results[i].volumeInfo.imageLinks.thumbnail}&title=${title}&author=${author}&length=${pageCount}&publishedDate=${publishedDate}&description=${encodeURIComponent(description)}&price=${listPrice}"><img src=${results[i].volumeInfo.imageLinks.thumbnail} alt=${title}><h2>` + title + `</h2><i>` + author + `</i><p>` + category + `</p><br><p>$` + listPrice + `</a>`;
                    }
                    else {
                        const price = 12.99;
                        book_div.innerHTML += `<a href="/views/single_book_view/index.html?cover=${results[i].volumeInfo.imageLinks.thumbnail}&title=${results[i].volumeInfo.title}&author=${author}&length=${results[i].volumeInfo.pageCount}&publishedDate=${results[i].volumeInfo.publishedDate}&description=${encodeURIComponent(results[i].volumeInfo.description)}&price=${listPrice}"><img src=${results[i].volumeInfo.imageLinks.thumbnail} alt=${results[i].volumeInfo.title}><h2>` + results[i].volumeInfo.title + `</h2>`+ `<i>` + results[i].volumeInfo.authors[0] + `</i><p>` + results[i].volumeInfo.categories[0] + `</p><br><p>$` + price + `</p></a>`;
                    
                    }
                    }
            }
        }
        else {
            message.innerHTML = `<p>An error occurred</p>`;
        }
    }
}

async function getAuthor(){
    main.innerHTML = "";
    let message = document.body.appendChild(document.createElement("div"))
    const author_name = document.getElementById('author_name').value;

    if (author_name == ""){        
        message.innerHTML = `<p>Please enter a valid book title</p>`;
    }
    else{
        message = "";
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${author_name}&filter=ebooks&download=epub&maxResults=40&key=` + google_books_api_key);
        if (response.ok){
            let data = await response.json()
            const results = data.items
            console.log(results)

            for (let i = 0; i < results.length; i++){
                let book_div = main.appendChild(document.createElement('div'));
                book_div.classList.add("book");
                book_div.setAttribute("id", "book");

                let listPrice = results[i]?.saleInfo?.listPrice?.amount ?? 12.99;

                let author = results[i]?.volumeInfo?.authors ?? 'n/a';

                let category = results[i]?.volumeInfo?.categories ?? 'n/a';

                let averageRating = results[i]?.volumeInfo?.averageRating ?? 'n/a';

                let description = results[i]?.volumeInfo?.description ?? 'n/a';

                let title = results[i]?.volumeInfo?.title ?? 'n/a';

                let pageCount = results[i]?.volumeInfo?.pageCount ?? 'n/a';

                let publishedDate = results[i]?.volumeInfo?.publishedDate ?? 'n/a';

                console.log("Full details: ", results[i]);

                console.log("Price: ", results[i]?.saleInfo?.listPrice?.amount ?? 12.99);

                console.log("Author: ", results[i]?.volumeInfo?.authors ?? 'n/a');



                //console.log("Current book: ", results[i].volumeInfo.authors[0]);
                //console.log("results: ", typeof results[i].saleInfo.listPrice.amount);
                //console.log("result type: ", typeof results[i].saleInfo.listPrice.amount === "number");
                //console.log("testing: ", results[i].saleInfo.listPrice.amount !== "undefined");
                //console.log("List Price: ", listPrice);

                if (results[i].volumeInfo.averageRating){                       
                    if (true) {                    
                        book_div.innerHTML += `<a href="/views/single_book_view/index.html?cover=${results[i].volumeInfo.imageLinks.thumbnail}&title=${title}&author=${author}&length=${pageCount}&publishedDate=${publishedDate}&description=${encodeURIComponent(description)}&price=${listPrice}"><img src=${results[i].volumeInfo.imageLinks.thumbnail} alt=${title}><h2>` + title + `</h2><i>` + author + `</i><p>` + averageRating + '★</p><p>' + category + `</p><br><p>$` + listPrice + `</a>`;
                    }
                    else{
                        const price = 12.99;
                        book_div.innerHTML += `<a href="/views/single_book_view/index.html?cover=${results[i].volumeInfo.imageLinks.thumbnail}&title=${results[i].volumeInfo.title}&author=${author}&length=${results[i].volumeInfo.pageCount}&publishedDate=${results[i].volumeInfo.publishedDate}&description=${encodeURIComponent(results[i].volumeInfo.description)}&price=${listPrice}"><img src=${results[i].volumeInfo.imageLinks.thumbnail} alt=${results[i].volumeInfo.title}><h2>` + results[i].volumeInfo.title + `</h2>`+ `<i>` + results[i].volumeInfo.authors[0] + `</i><p>` + results[i].volumeInfo.averageRating + '★</p><p>' + results[i].volumeInfo.categories[0] + `</p><br><p>$` + price + `</p></a>`;
                    
                    }
                }

                else {
                    if (true){
                        book_div.innerHTML += `<a href="/views/single_book_view/index.html?cover=${results[i].volumeInfo.imageLinks.thumbnail}&title=${title}&author=${author}&length=${pageCount}&publishedDate=${publishedDate}&description=${encodeURIComponent(description)}&price=${listPrice}"><img src=${results[i].volumeInfo.imageLinks.thumbnail} alt=${title}><h2>` + title + `</h2><i>` + author + `</i><p>` + category + `</p><br><p>$` + listPrice + `</a>`;
                    }
                    else {
                        const price = 12.99;
                        book_div.innerHTML += `<a href="/views/single_book_view/index.html?cover=${results[i].volumeInfo.imageLinks.thumbnail}&title=${results[i].volumeInfo.title}&author=${author}&length=${results[i].volumeInfo.pageCount}&publishedDate=${results[i].volumeInfo.publishedDate}&description=${encodeURIComponent(results[i].volumeInfo.description)}&price=${listPrice}"><img src=${results[i].volumeInfo.imageLinks.thumbnail} alt=${results[i].volumeInfo.title}><h2>` + results[i].volumeInfo.title + `</h2>`+ `<i>` + results[i].volumeInfo.authors[0] + `</i><p>` + results[i].volumeInfo.categories[0] + `</p><br><p>$` + price + `</p></a>`;
                    
                    }
                    }
            }
        }
        else {
            message.innerHTML = `<p>An error occurred</p>`;
        }
    }
}

document.getElementById("getBooks").addEventListener("click", () => {
    getBooks();
})

document.getElementById("getAuthor").addEventListener("click", () => {
    getAuthor();
})

