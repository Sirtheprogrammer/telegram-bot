import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function ask(ctx) {
  const prompt = ctx.message.text.split(' ').slice(1).join(' ');
  if (!prompt) return ctx.reply('Usage: /ask <question>');
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const answer = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response.';
    ctx.reply(answer);
  } catch (e) {
    ctx.reply('Gemini API error.');
  }
}
