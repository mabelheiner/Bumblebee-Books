const google_books_api_key = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

async function getBookInfo(){

    const urlParams = new URLSearchParams(window.location.search);

    let main = document.querySelector("main");

    //console.log(urlParams.get("description"));
    main.innerHTML = `<h2>${urlParams.get("title")}<h2>`;
    main.innerHTML += `<p><i>${urlParams.get("author")}</i></p>`;
    main.innerHTML += `<img src=${urlParams.get("cover")}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api alt=${urlParams.get("title")}>`;
    main.innerHTML += `<p>Published Date: ${urlParams.get("publishedDate")}</p>`;
    main.innerHTML += `<p>Page Count: ${urlParams.get("length")} pages</p>`;
    main.innerHTML += `<p>Price: $${urlParams.get("price")} USD</p>`;
    main.innerHTML += `<p>${urlParams.get("description")}</p>`;
}

getBookInfo();