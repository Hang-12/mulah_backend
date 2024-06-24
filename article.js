// async function fetchArticles() {
//   try {
//     const response = await fetch('http://localhost:3000/api/articles');
//     const articles = await response.json();
//     const articlesContainer = document.querySelector('.articles');

//     articles.forEach((article) => {
//       const articleElement = document.createElement('div');
//       articleElement.className = 'article';

//       const titleElement = document.createElement('h2');
//       const titleLink = document.createElement('a');
//       titleLink.href = article.url;
//       titleLink.textContent = article.title;
//       titleElement.appendChild(titleLink);

//       const articleDate = document.createElement('p');
//       articleDate.textContent = new Date(article.date).toLocaleString();

//       articleElement.appendChild(titleElement);
//       articleElement.appendChild(articleDate);
//       articlesContainer.appendChild(articleElement);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }