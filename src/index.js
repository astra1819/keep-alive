// server.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// List of sample restaurant IDs
const restaurantIds = [
  "654087",
  "725082",
  "620953",
  "1019000",
  "290590",
  "712098",
  "373155",
  "254135",
];

// List of user-agents to simulate browser requests
const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.2 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0",
];

// Util: Get a random item from an array
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Create a randomized endpoint URL
function getRandomTargetUrl() {
  const restaurantId = getRandomItem(restaurantIds);
  const endpoints = [
    "https://foodie-backend-so1x.onrender.com/api/restaurantdata",
    `https://foodie-backend-so1x.onrender.com/api/restaurantmenudata/${restaurantId}`,
  ];
  return getRandomItem(endpoints);
}

// Perform a ping with randomized headers
async function performPing() {
  const targetUrl = getRandomTargetUrl();
  try {
    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "User-Agent": getRandomItem(userAgents),
        Accept: "application/json,text/html;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://google.com",
      },
    });

    console.log(
      `[${new Date().toISOString()}] ✅ Pinged: ${targetUrl} | Status: ${
        response.status
      }`
    );
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] ❌ Failed to ping ${targetUrl}: ${
        error.message
      }`
    );
  }
}

// Schedule next ping with a random delay between 1–14 minutes
function scheduleNextPing() {
  const min = 1 * 60 * 1000; // 1 minute
  const max = 14 * 60 * 1000; // 14 minutes
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;

  setTimeout(async () => {
    await performPing();
    scheduleNextPing(); // recursive scheduling
  }, delay);
}

// Health check endpoint
app.get("/ping", (req, res) => {
  res.send("Ping ✅");
});
app.get("/pong", (req, res) => {
  res.send("Pong ✅");
});
app.get("/ding", (req, res) => {
  res.send("Ding ✅");
});
app.get("/dong", (req, res) => {
  res.send("Dong ✅");
});
app.get("/ting", (req, res) => {
  res.send("Ting ✅");
});
app.get("/tong", (req, res) => {
  res.send("Tong ✅");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  scheduleNextPing(); // Start ping loop once server is live
});
