import { randomBytes } from 'crypto'
import moment from 'moment-timezone'
let handler = async (m, { conn, text }) => {
  let d = new Date(new Date + 3600000)
  let locale = 'id'
  let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
  let week = d.toLocaleDateString(locale, { weekday: 'long' })
  let date = d.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
  let wibh = moment.tz('Asia/Jakarta').format('HH')
  let wibm = moment.tz('Asia/Jakarta').format('mm')
  let wibs = moment.tz('Asia/Jakarta').format('ss')
  let wktuwib = `${wibh} H ${wibm} M ${wibs} S`
  let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0])
  let cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m
  let teks = text ? text : cc.text
  conn.reply(m.chat, `_Mengirim pesan broadcast ke ${groups.length} grup_`, m)
  for (let id of groups) await conn.copyNForward(id, conn.cMod(m.chat, cc, /bc|broadcast/i.test(teks) ? `–––『 *BROADCAST* 』–––\n` + teks : `–––『 *BROADCAST* 』–––\n` + teks + '\n' + readMore + '\n\n' + `⻝ 𝗗𝗮𝘁𝗲: ${week} ${date}\n⻝ 𝗧𝗶𝗺𝗲: ${wktuwib}`), true).catch(_ => _)
  m.reply('Selesai Broadcast All Group :)')
}
handler.help = ['broadcastgroup']
handler.tags = ['owner']
handler.command = /^(broadcastgroup|bcgc)$/i
handler.owner = true
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

const randomID = length => randomBytes(Math.ceil(length * .5)).toString('hex').slice(0, length)
/*
SCRIPT BY © VYNAA VALERIE 
•• recode kasih credits 
•• contacts: (t.me/VLShop2)
•• instagram: @vynaa_valerie 
•• (github.com/VynaaValerie) 
*/