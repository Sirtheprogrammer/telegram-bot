import { Telegraf } from 'telegraf';
import express from 'express';
import dotenv from 'dotenv';
import { ipinfo, dork } from './modules/recon.js';
import { portscan } from './modules/scanning.js';
import { genlink } from './modules/phishing.js';
import { ask } from './modules/gemini.js';
import { whois, subdomains, headers } from './modules/extra.js';
import { imagegen } from './modules/imagegen.js';

dotenv.config();
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply(`🤖 Welcome to HackerBot!\n\nAvailable commands:\n/ipinfo <IP> - Fetch IP details\n/dork <query> - Google dork scraper\n/dorkhelp - Show sample Google dorking queries\n/imagegen <prompt> - Generate AI image\n/portscan <ip> - Fast port scanner\n/genlink <service> - Simple phishing link generator`));
bot.command('ipinfo', ipinfo);
bot.command('dork', dork);
bot.command('portscan', portscan);
bot.command('genlink', genlink);
bot.command('ask', ask);
bot.command('whois', whois);
bot.command('subdomains', subdomains);
bot.command('headers', headers);
bot.command('dorkhelp', (ctx) => ctx.replyWithHTML(`
<b>Sample Google Dorking Queries:</b>\n\n
data leak filetype:txt site:pastebin.com
inurl:admin.php
intitle:index.of passwd
site:gov inurl:login
filetype:sql intext:password
inurl:/phpinfo.php
site:edu "confidential"

Use <code>/dork &lt;query&gt;</code> to try your own!`));
bot.command('imagegen', imagegen);


// Start Telegram bot
bot.launch();
console.log('HackerBot is running!');

// Start Express status server
const app = express();
const PORT = 3000;
app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>sirtech t-bot</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
      body { background: #181c20; color: #fff; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
      .card { background: #23272b; border-radius: 1rem; box-shadow: 0 4px 24px #000a; }
      .github-link { color: #fff; transition: color 0.2s; }
      .github-link:hover { color: #6cc644; }
      .icon { width: 2rem; height: 2rem; vertical-align: middle; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card p-4 text-center">
            <h1 class="mb-3">sirtech t-bot</h1>
            <p class="lead mb-4">🤖 The Telegram bot is <span class="badge bg-success">ALIVE</span></p>
            <hr>
            <div class="mb-2">Owner: <b>sirtheprogrammer</b></div>
            <a href="https://github.com/sirtheprogrammer" class="github-link" target="_blank">
              <svg class="icon" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.11.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
              <span class="ms-2">sirtheprogrammer</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </body>
  </html>
  `);
});
app.listen(PORT, () => {
  console.log(`sirtech t-bot status page running on http://localhost:${PORT}`);
});

process.once('SIGINT', () => { bot.stop('SIGINT'); process.exit(); });
process.once('SIGTERM', () => { bot.stop('SIGTERM'); process.exit(); });
