// src/index.js

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const TARGET_URL =
  "https://foodie-backend-so1x.onrender.com/api/restaurantdata/"; // 👈 Change this

// A simple endpoint to receive pings
app.get("/ping", (req, res) => {
  console.log(`[${new Date().toISOString()}] Received ping`);
  res.send("Pong");
});

const userAgents = [
  // Chrome on Windows
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
  // Chrome on macOS
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  // Firefox on Linux
  "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0",
  // Safari on iPhone
  "Mozilla/5.0 (iPhone; CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.2 Mobile/15E148 Safari/604.1",
  // Edge on Windows
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0",
];

function getRandomUserAgent() {
  const index = Math.floor(Math.random() * userAgents.length);
  return userAgents[index];
}

// Function to randomly ping the other server
function startRandomPing() {
  const min = 1 * 60 * 1000; // 1 minute in ms
  const max = 14 * 60 * 1000; // 14 minutes in ms
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;

  setTimeout(async () => {
    try {
      const response = await fetch(TARGET_URL, {
        method: "GET",
        headers: {
          "User-Agent": getRandomUserAgent(),
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
          Referer: "https://google.com/",
        },
      });
      console.log(
        `[${new Date().toISOString()}] Pinged: ${TARGET_URL}, Status: ${
          response.status
        }`
      );
    } catch (err) {
      console.error(
        `[${new Date().toISOString()}] Failed to ping: ${TARGET_URL}`,
        err.message
      );
    }

    // Schedule the next ping
    startRandomPing();
  }, delay);
}

// Start the ping loop
startRandomPing();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
