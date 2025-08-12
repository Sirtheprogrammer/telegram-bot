import net from 'net';

// Only scan the most common ports for speed (especially over Tor)
const COMMON_PORTS = [21, 22, 23, 25, 53, 80, 110, 143, 443, 465, 587, 993, 995, 3306, 3389, 5900, 8080, 8443];

export async function portscan(ctx) {
  const ip = ctx.message.text.split(' ')[1];
  if (!ip) return ctx.reply('Usage: /portscan <ip>');
  ctx.reply('Scanning common ports (this may take a few seconds over Tor)...');
  const open = [];
  const scan = (port) => new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(200);
    socket.on('connect', () => {
      open.push(port);
      socket.destroy();
      resolve();
    });
    socket.on('timeout', () => {
      socket.destroy();
      resolve();
    });
    socket.on('error', () => resolve());
    socket.connect(port, ip);
  });
  for (const port of COMMON_PORTS) {
    await scan(port);
  }
  ctx.replyWithHTML(`<b>Open ports on ${ip}:</b>\n${open.join(', ') || 'None'}`);
}
