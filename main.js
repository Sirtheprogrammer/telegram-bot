import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import { ipinfo, dork } from './modules/recon.js';
import { portscan } from './modules/scanning.js';
import { genlink } from './modules/phishing.js';
import { ask } from './modules/gemini.js';
import { whois, subdomains, headers } from './modules/extra.js';
import { imagegen } from './modules/imagegen.js';

dotenv.config();
import { SocksProxyAgent } from 'socks-proxy-agent';
const agent = new SocksProxyAgent('socks5h://127.0.0.1:9050');
const bot = new Telegraf(process.env.BOT_TOKEN, {
  telegram: { agent }
});

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

bot.launch();
console.log('HackerBot is running via Tor SOCKS5 proxy...');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
