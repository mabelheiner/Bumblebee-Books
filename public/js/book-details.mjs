const google_books_api_key = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

const urlParams = new URLSearchParams(window.location.search);

console.log(urlParams.get("book-id"));

let main = document.querySelector("main")

async function getBookInfo(){
    /*
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${urlParams.get("book-id")}&key=` + google_books_api_key);
    if(response.ok){
        let data = await response.json();
        console.log("Book details", data);
    }
    else{
        main.innerHTML = `<p>Unable to find book details</p>`;
    }
    */

    console.log(urlParams.get("cover"))
    main.innerHTML = `<h2>${urlParams.get("title")}<h2>`;
    main.innerHTML += `<img src=${urlParams.get("cover")}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api alt=${urlParams.get("title")}>`;
    main.innerHTML += `<p>Published Date: ${urlParams.get("publishedDate")}</p>`;
    main.innerHTML += `<p>Page Count: ${urlParams.get("length")} pages</p>`;
    main.innerHTML += `<p>${urlParams.get("description")}</p>`;
}

getBookInfo();