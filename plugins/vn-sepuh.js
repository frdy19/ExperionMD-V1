import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
let vn = "https://l.top4top.io/m_30044dlj79.mp3"
	conn.sendFile(m.chat, vn, "gaa.mp3", null, m, true, {
		type: "audioMessage",
		ptt: true,
	});
let stiker = await sticker(null, `https://telegra.ph/file/1466c1926e595905f6b92.jpg`, global.packname, global.author)
    if (stiker) return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    throw stiker.toString()
    
}

handler.customPrefix = /^(mastah|sepuh|sesepuh|tutor|kroco|ajarin)$/i;
handler.command = new RegExp();

export default handler