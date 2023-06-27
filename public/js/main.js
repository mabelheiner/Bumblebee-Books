function renderPartials(){

  const header = `
  <span id="logo">
    <a href="/" title="Return to home page">
      <img src="/public/images/Logo2.webp" alt="Company Logo" width="150" height="200">
    </a>
  </span>
  <nav>
    <ul id="menu">
        <li><a href="/">Home</a></li>
        <li><a href="/views/find_book_view/index.html">Books</a></li>
        <li><a href="/views/account/index.html">Account</a></li>
        <li><a href="/views/cart/index.html">Cart</a></li>
    </ul>
  </nav>`
  
  document.getElementById('top-header').innerHTML = header;
  
  const head = `<meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bumblebee Books</title>
  <link rel="stylesheet" href="/public/css/style.css">
  <!-- Favicon -->
  <link rel="icon" type="image/png" sizes="32x32" href="public\images\Logo2.webp">
  <script type="module" src="/public/js/main.js"></script>
  <script src="/public/js/top-favorites.js" defer></script>
  <style>
      /* Roboto, Roboto Slab, Cinzel, Aleygra Sans SC */
      @import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC&family=Cinzel&family=Roboto&family=Roboto+Slab&display=swap');
  </style>`;
  
  document.querySelector('head').innerHTML = head;
  
  const footer = `<p class="copyright">&copy; <span id="currentyear"></span> Bumblebee Books | WDD 330</p>`;
  
  document.querySelector('footer').innerHTML = footer;
}

renderPartials()

// Footer Current Year Code
const today = new Date();
document.querySelector("#currentyear").textContent = today.getFullYear();
