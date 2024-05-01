let handler = async (m, { conn, text, args, usedPrefix, command }) => {
if (args[0] == 'reset') {
let list = Object.entries(global.db.data.users)
	let lim = !args || !args[0] ? 50 : isNumber(args[0]) ? parseInt(args[0]) : 50
	lim = Math.max(1, lim)
	list.map(([user, data], i) => (Number(data.limit = lim)))
		conn.reply(m.chat, `*Berhasil Direset ${lim} / User*`, m)
		}
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    let ke1 = global.db.data.users[who].limit
    let ke2 = global.db.data.users[who].exp
    let ke3 = global.db.data.users[who].money
    let ke4 = global.db.data.users[who].level
    let ke5 = global.db.data.users[who].role
    let ke6 = global.db.data.users[who].chip
    let ke7 = global.db.data.users[who].bank
    let ke8 = global.db.data.users[who].atm
    let ke9 = global.db.data.users[who].robo
    
    let caption = `
 *ɪ ɴ ғ ᴏ - ᴜ s ᴇ ʀ s*
 
◦ *ʟɪᴍɪᴛ:* ${ke1}
◦ *ᴇxᴘ:* ${ke2}
◦ *ᴍᴏɴᴇʏ:* ${ke3}
◦ *ʟᴇᴠᴇʟ:* ${ke4}
◦ *ʀᴏʟᴇ:* ${ke5}
◦ *ᴄʜɪᴘ:* ${ke6}
◦ *ʙᴀɴᴋ:* ${ke7}
◦ *ʀᴏʙᴏ:* ${ke9}

sɪᴍᴘʟᴇ ɪɴᴠᴇɴᴛᴏʀʏ ᴜsᴇʀ
`
  conn.reply(m.chat, caption, m)

}
handler.help = ['me']
handler.tags = ['main']
handler.command = /^(me)$/i
handler.group = true

export default handler

function isNumber(x = 0) {
  x = parseInt(x)
  return !isNaN(x) && typeof x == 'number'
}