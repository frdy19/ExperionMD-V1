import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const name = conn.getName(m.sender);
  if (!text) {
    throw `Hi *${name}*, do you want to talk? Respond with *${usedPrefix + command}* (your message)\n\n📌 Example: *${usedPrefix + command}* Hi bot`;
  }
  const msg = encodeURIComponent(text);
  
  const res = await fetch(`https://ultimetron.guruapi.tech/rekha?prompt=${msg}`);

  const json = await res.json();
  
  
    let reply = json.result.response;
    m.reply(reply);

};

handler.help = ['vynaa'];
handler.tags = ['aiv2'];
handler.command = ['vynaa'];

export default handler;

