const google_books_api_key = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

//const urlParams = new URLSearchParams(window.location.search);

//let main = document.querySelector("main");

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

    const urlParams = new URLSearchParams(window.location.search);

    let main = document.querySelector("main");

    //console.log(urlParams.get("description"));
    main.innerHTML = `
  <div class="grid-container">
    <div class="details">
      <h2 id="title">${urlParams.get("title")}</h2>
      <p id="authorName"><i>By: ${urlParams.get("author")}</i></p>
      <img id="cover" src=${urlParams.get("cover")}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api alt=${urlParams.get("title")}>
      <p id="description">${urlParams.get("description")}</p>
      <p id="publishedDate">First Published ${urlParams.get("publishedDate")}</p>
      <p id="pageCount">${urlParams.get("length")} Pages Long</p>
    </div>
    <label class="like" id="like_button">
      <input type="checkbox" name="checkbox" />
      <div class="hearth">
        <p id="favorite">Favorite</p>
      </div>
    </label>
  </div>
`;

}

getBookInfo();

