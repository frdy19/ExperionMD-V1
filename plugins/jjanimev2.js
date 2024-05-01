const { MessageType } = require('@adiwajshing/baileys');

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}

const afriza = [
  "https://telegra.ph/file/b3a6671850aa65c4d6d91.mp4",
"https://telegra.ph/file/0e85d1311221f5bd3e449.mp4",
"https://telegra.ph/file/00426063bb764c1d746bc.mp4",
"https://telegra.ph/file/816478dc98e3174c8df23.mp4",
"https://telegra.ph/file/f4a59ce8119092987952f.mp4",
"https://telegra.ph/file/66f6d84fbf838f6ec7d18.mp4",
"https://telegra.ph/file/ab685c780d9fca150d7d2.mp4",
"https://telegra.ph/file/e76f9fab7fcf2965c7635.mp4",
 
];

const handler = async (m, { conn, usedPrefix, command }) => {
  const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  const name = conn.getName(who);
  conn.sendFile(m.chat, pickRandom(afriza), null, `Nih Kak *${name}* >//<`, m);
};

handler.help = ['jjanime2'];
handler.tags = ['maker'];
handler.command = /^(jjanime2)$/i;
handler.premium = false;
handler.limit = false;
handler.fail = null;
handler.private = false
handler.register = false;

module.exports = handler;