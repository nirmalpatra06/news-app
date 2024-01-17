///////////////////
const apiKey = "ac92f5ddf2e74128a0d907246a65f9cf";
const url = "https://newsapi.org/v2/everything?q=";

let query = "india";
////////////////////

function generateHTML(articles) {
  const cardsContainer = document.querySelector(".cards-container");

  cardsContainer.innerHTML = "";

  const tempCard = document.getElementById("template-card");
  articles.forEach((article) => {
    if (!article.urlToImage) return;
    // const cardClone = tempCard.content.cloneNode(true);
    const cardClone = document.importNode(tempCard.content, true);
    fillData(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}
function fillData(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-date");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage;
  newsTitle.innerText = article.title;
  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
  newsSource.innerText = `${article.source.name} ${date}`;
  newsDesc.innerText = article.description;

  // cardClone.firstElementChild.addEventListener("click", () => {
  //   window.open(article.url, "_blank");
  // });
}
async function getNews(query) {
  try {
    const res = await fetch(`${url}${query}&apiKey=${apiKey}`);
    const data = await res.json();
    console.log(data);
    generateHTML(data.articles);
  } catch {
    alert("Failed to load Data");
  }
}
getNews(query);
let curSelectedNav = null;
function showNavNews(id) {
  getNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}
