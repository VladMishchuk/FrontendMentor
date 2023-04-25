function summaryJson() {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((article) => {
        let category = article.category,
          score = article.score,
          icon = article.icon;
        addArticle(category, icon, score);
      });
    });
}
summaryJson();

let categoryList = document.querySelector(".score-list");

function addArticle(category, icon, score) {
  return (categoryList.innerHTML += `<article class="${category.toLowerCase()}">
  <div class="article__group">
    <img
      class="summary__icon"
      src="${icon}"
      alt="${category}"
    />
    <h3>${category}</h3>
  </div>
  <p>
    <span>${score}</span> / 100
  </p>
</article>`);
}
