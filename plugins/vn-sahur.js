let handler = async (m, { conn }) => {
    let link = [
        "https://e.top4top.io/m_2993n5oqf9.mp3",
        "https://l.top4top.io/m_2993sla0m9.mp3"
    ];
    let randomLink = link[Math.floor(Math.random() * link.length)];

    let text = "*S A H U R - S A H U R*";

    await conn.sendMessage(m.chat, {
        text: text,
        contextInfo: {
            externalAdReply: {
                title: global.namebot,
                body: global.author,
                thumbnailUrl: global.vynaajpg,
                sourceUrl: 'https://linkbio.co/VLShop',
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    });

    await conn.sendFile(m.chat, randomLink, 'audio.mp3', null, m, false, {
        mimetype: 'audio/mp4'
    });
};

handler.customPrefix = /^(sahur|sahurrr|cahurr)$/i;
handler.command = new RegExp();

export default handler;
// SC BY © VYNAA CHAN
// RECODE WAJIB KASI CREDITS 
// WA: 6282389924037
// TOKO KEBUTUHAN BOT TERPERCAYA
// HANYA DI SINI
// https://linkbio.co/VLShop
// https://t.me/VynaaMD