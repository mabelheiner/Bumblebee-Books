const google_books_api_key = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

let main = document.querySelector("main");

async function getBooks(){
    main.innerHTML = "";
    let message = document.body.appendChild(document.createElement("div"))
    const book_name = document.getElementById('book_name').value;

    if (book_name == ""){
        message.innerHTML = `<p>Please enter a valid book title</p>`;
    }
    else{
        message = "";
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${book_name}&download=epub&filter=ebooks&key=` + google_books_api_key);
        if (response.ok){
            let data = await response.json()
            const results = data.items
            console.log(results)

            for (let i = 0; i < results.length; i++){
                let book_div = main.appendChild(document.createElement('div'));
                book_div.classList.add("book");

                book_div.innerHTML += `<img src=${results[i].volumeInfo.imageLinks.thumbnail} alt=${results[i].volumeInfo.title}><h2>` + results[i].volumeInfo.title + `</h2>`+ `<a href=${results[i].saleInfo.buyLink} target='_blank'>Buy Here</a>` + `<p>` +  results[i].volumeInfo.description + `</p>`;
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
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${author_name}&filter=ebooks&download=epub&key=` + google_books_api_key);
        if (response.ok){
            let data = await response.json()
            const results = data.items
            console.log(results)

            for (let i = 0; i < results.length; i++){
                let book_div = main.appendChild(document.createElement('div'));
                book_div.classList.add("book");

                book_div.innerHTML += `<img src=${results[i].volumeInfo.imageLinks.thumbnail} alt=${results[i].volumeInfo.title}><h2>` + results[i].volumeInfo.title + `</h2>`+ `<a href=${results[i].saleInfo.buyLink} target='_blank'>Buy Here</a>` + `<p>` +  results[i].volumeInfo.description + `</p>`;
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