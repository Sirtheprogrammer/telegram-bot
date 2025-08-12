// More commands can be added here
export async function whois(ctx) {
  const domain = ctx.message.text.split(' ')[1];
  if (!domain) return ctx.reply('Usage: /whois <domain>');
  ctx.reply(`[WHOIS] Feature coming soon for ${domain}`);
}

export async function subdomains(ctx) {
  const domain = ctx.message.text.split(' ')[1];
  if (!domain) return ctx.reply('Usage: /subdomains <domain>');
  ctx.reply(`[Subdomains] Feature coming soon for ${domain}`);
}

export async function headers(ctx) {
  const url = ctx.message.text.split(' ')[1];
  if (!url) return ctx.reply('Usage: /headers <url>');
  ctx.reply(`[Headers] Feature coming soon for ${url}`);
}
