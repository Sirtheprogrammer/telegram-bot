import axios from 'axios';

export async function imagegen(ctx) {
  const prompt = ctx.message.text.split(' ').slice(1).join(' ');
  if (!prompt) return ctx.reply('Usage: /imagegen <prompt>');
  const apiKey = process.env.HYPERBOLIC_API_KEY;
  if (!apiKey) return ctx.reply('Image generation requires HYPERBOLIC_API_KEY in .env');
  try {
    const { data } = await axios.post('https://api.hyperbolic.xyz/v1/image/generation', {
      prompt,
      model_name: 'SDXL1.0-base',
      style: 'realistic',
      height: 1024,
      width: 1024
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    const imgBase64 = data?.images?.[0]?.image;
    if (!imgBase64) return ctx.reply('❌ No image found in response!');
    await ctx.replyWithPhoto({ source: Buffer.from(imgBase64, 'base64') }, { caption: '✅ AI Image generated!' });
  } catch (e) {
    ctx.reply('Image generation error!');
  }
}
