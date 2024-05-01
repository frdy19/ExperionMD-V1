let handler = async(m, { conn }) => {
    let msg = await conn.sendContact(m.chat, owner, m)
    await delay(1000)
    await conn.sendMessage(m.chat, { text: `Hallo Kak @${m.sender.split('@')[0]}, Itu Nomor Ownerku Jangan Di Spam Ya!`, mentions: [m.sender] }, { quoted: msg })
let vn = "./vn/yowaimo.mp3"
    await conn.sendFile(m.chat, vn, 'kuru.mp3', null, m, true, {
        type: "audio",
        ptt: true,
    })
}
handler.help = ['owner']
handler.tags = ['info']
handler.command = /^(owner|creator)$/i

export default handler

const delay = time => new Promise(res => setTimeout(res, time))
// SC BY © VYNAA CHAN
// RECODE WAJIB KASI CREDITS 
// WA: 6283896757978
// TOKO KEBUTUHAN BOT TERPERCAYA
// HANYA DI SINI
// https://linkbio.co/VLShop
// https://t.me/VynaaMD