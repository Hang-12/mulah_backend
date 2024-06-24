const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const { DateTime } = require('luxon');

const app = express();
const PORT = 3000;

const getArticles = async () => {
  try {
    const { data } = await axios.get('https://sea.mashable.com/');
    const $ = cheerio.load(data);
    let articles = [];

    $('h2.c-entry-box--compact__title').each((i, elem) => {
      const title = $(elem).text().trim();
      const url = $(elem).find('a').attr('href');
      const dateStr = $(elem).closest('article').find('time').attr('datetime');

      console.log(`Title: ${title}, URL: ${url}, Date: ${dateStr}`);

      if (dateStr) {
        const date = DateTime.fromISO(dateStr);
        if (date.isValid && date >= DateTime.fromISO('2022-01-01')) {
          articles.push({ title, url, date: date.toISO() });
        }
      }
    }); 

    articles.sort((a, b) => DateTime.fromISO(b.date) - DateTime.fromISO(a.date));
    console.log(`Total Articles Found: ${articles.length}`);
    return articles;
  } catch (error) {
    console.error('Error fetching articles', error);
    return [];
  }
};

app.get('/', async (req, res) => {
  const vergeArticles = await getArticles();
  let htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>The Verge Articles</title>
      <style>
        body {
          background-color: white;
          color: black;
          font-family: Arial, sans-serif;
        }
        a {
          color: black;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
        .container {
          width: 80%;
          margin: 0 auto;
        }
        .article {
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>The Verge Articles</h1>
  `;
  vergeArticles.forEach(article => {
    htmlContent += `
      <div class="article">
        <h2><a href="${article.url}">${article.title}</a></h2>
        <p>${new Date(article.date).toLocaleString()}</p>
      </div>
    `;
  });
  htmlContent += `
      </div>
    </body>
    </html>
  `;
  res.send(htmlContent);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});