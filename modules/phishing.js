export async function genlink(ctx) {
  const service = ctx.message.text.split(' ')[1];
  if (!service) return ctx.reply('Usage: /genlink <service>');
  const link = `https://phish.example.com/${service}-login`;
  ctx.replyWithHTML(`<b>Phishing link template for ${service}:</b>\n<code>${link}</code>`);
}
