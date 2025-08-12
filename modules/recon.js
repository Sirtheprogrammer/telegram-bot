import axios from 'axios';

export async function ipinfo(ctx) {
  const ip = ctx.message.text.split(' ')[1];
  if (!ip) return ctx.reply('Usage: /ipinfo <IP>');
  try {
    const { data } = await axios.get(`http://ip-api.com/json/${ip}`);
    ctx.replyWithHTML(
      `<b>IP:</b> ${data.query}\n<b>Country:</b> ${data.country}\n<b>ISP:</b> ${data.isp}\n<b>Org:</b> ${data.org}\n<b>City:</b> ${data.city}\n<b>ASN:</b> ${data.as}`
    );
  } catch (e) {
    ctx.reply('Error fetching IP info.');
  }
}

// Google Dorking using SerpAPI (recommended, reliable)
export async function dork(ctx) {
  const query = ctx.message.text.split(' ').slice(1).join(' ');
  if (!query) return ctx.reply('Usage: /dork <query>');
  const apiKey = process.env.SERPAPI_KEY;
  if (!apiKey) {
    return ctx.reply('Google dorking requires SERPAPI_KEY in .env. Get one at serpapi.com');
  }
  try {
    const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&engine=google&api_key=${apiKey}`;
    const { data } = await axios.get(url);
    const results = data.organic_results?.slice(0, 5) || [];
    if (!results.length) return ctx.reply('No results found.');
    let msg = `<b>Top Google Dork results:</b>\n`;
    for (const r of results) {
      msg += `\n<a href=\"${r.link}\">${r.title}</a>`;
    }
    ctx.replyWithHTML(msg, { disable_web_page_preview: true });
  } catch (e) {
    ctx.reply('Error fetching Google results.');
  }
}
