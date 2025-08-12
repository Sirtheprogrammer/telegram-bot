# HackerBot (Node.js)

A Telegram hacking assistant bot built with Node.js and Telegraf.

## Features
- /start: Welcome/help
- /ipinfo <IP>: Fetch IP details
- /dork <query>: Google dork scraper
- /portscan <ip>: Fast port scanner
- /genlink <service>: Simple phishing link generator

## Setup
1. Install dependencies:
   ```sh
   npm install
   ```
2. Set your bot token in `.env`:
   ```
   BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
   ```
3. Start the bot:
   ```sh
   npm start
   ```

## Structure
- `main.js`: Bot entry point
- `modules/`: Command handlers
- `utils/`: Helper functions

---
For educational and authorized use only.
