require('dotenv').config(); // Import dotenv to use environment variables
const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');

const app = express();
const PORT = process.env.PORT || 3000;
const cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes

const generateSVG = (username, repos) => {
  const repoDetails = repos.map((repo, index) => `
    <g class="stagger" style="animation-delay: ${450 + index * 150}ms" transform="translate(25, ${index * 20})">
      <text class="stat bold" y="12.5">Repo: ${repo.name}</text>
      <text class="stat bold" x="199.01" y="12.5">Stars: ${repo.stars}</text>
    </g>
  `).join('');

  return `
<svg
  width="450"
  height="165"
  viewBox="0 0 450 165"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  role="img"
  aria-labelledby="descId"
>
  <title id="titleId">${username}'s Most Popular Repositories</title>
  <desc id="descId">Displaying the most popular repositories by star count</desc>
  <style>
    .header {
      font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
      fill: #82aaff;
      animation: fadeInAnimation 0.8s ease-in-out forwards;
    }
    @supports(-moz-appearance: auto) {
      .header { font-size: 15.5px; }
    }
    .stat {
      font: 600 14px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif;
      fill: #27e8a7;
    }
    @supports(-moz-appearance: auto) {
      .stat { font-size:12px; }
    }
    .stagger {
      opacity: 0;
      animation: fadeInAnimation 0.3s ease-in-out forwards;
    }
    @keyframes fadeInAnimation {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  </style>

  <rect
    data-testid="card-bg"
    x="0.5"
    y="0.5"
    rx="4.5"
    height="99%"
    stroke="#e4e2e2"
    width="449"
    fill="#242938"
    stroke-opacity="0"
  />
  <g data-testid="card-title" transform="translate(25, 35)">
    <text x="0" y="0" class="header" data-testid="header">${username}'s Most Popular Repositories</text>
  </g>

  <g data-testid="main-card-body" transform="translate(0, 55)">
    ${repoDetails}
  </g>
</svg>`;
};

app.get('/popular-repos', async (req, res) => {
  const username = req.query.username;

  if (!username) {
    return res.status(400).send('Username query parameter is required.');
  }

  // Check if data is in cache
  const cachedRepos = cache.get(username);
  if (cachedRepos) {
    console.log(`Cache hit for ${username}`);
    const svg = generateSVG(username, cachedRepos);
    return res.setHeader('Content-Type', 'image/svg+xml').send(svg);
  }

  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    });

    const repos = response.data
      .sort((a, b) => b.stargazers_count - a.stargazers_count)  // Sort by stars in descending order
      .slice(0, 5)  // Get top 5 repositories
      .map(repo => ({
        name: repo.name,
        stars: repo.stargazers_count,
      }));

    // Store data in cache
    cache.set(username, repos);

    const svg = generateSVG(username, repos);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to fetch repositories.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
