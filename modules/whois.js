import whois from "whois-json";

// /whois command handler
export async function whoisLookup(ctx) {
  const domain = ctx.message.text.split(" ")[1];
  if (!domain) {
    return ctx.reply("Usage: /whois <domain>");
  }

  try {
    ctx.reply(`🔍 Running WHOIS lookup for *${domain}*...`, { parse_mode: "Markdown" });

    const data = await whois(domain);

    let reply = `🌐 *WHOIS Lookup for ${domain}*\n`;
    reply += `\n📅 Created: ${data.creationDate || "N/A"}`;
    reply += `\n📅 Updated: ${data.updatedDate || "N/A"}`;
    reply += `\n📅 Expiry: ${data.registryExpiryDate || "N/A"}`;
    reply += `\n🏢 Registrar: ${data.registrar || "N/A"}`;
    reply += `\n👤 Registrant: ${data.registrant || "Hidden/Private"}`;
    reply += `\n🖥️ Name Servers: ${Array.isArray(data.nameServers) ? data.nameServers.join(", ") : "N/A"}`;
    reply += `\n📍 Country: ${data.country || "N/A"}`;

    ctx.reply(reply, { parse_mode: "Markdown" });

  } catch (error) {
    console.error("WHOIS Lookup Error:", error);
    ctx.reply("⚠️ Error retrieving WHOIS data.");
  }
}
