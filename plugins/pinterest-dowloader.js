import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    text = text.endsWith('SMH') ? text.replace('SMH', '') : text;
    if (!text) throw `Contoh: ${usedPrefix + command} https://id.pinterest.com/pin/29414203809412603/`;
    const urls = text.match(/https?:\/\/[^\s]+/g);
    
    if (urls) {
        for (const url of urls) {
            const res = await pinterest(url);
            
            if (res && res.length > 0) {
                for (const item of res) {
                    await conn.sendFile(m.chat, item.url, '', `Success Download: ${item.url}`, m);
                }
            } else {
                throw 'Media tidak ditemukan.';
            }
        }
    } else {
        throw 'Tidak ada URL Pinterest yang valid ditemukan.';
    }
};

handler.help = ['downloadpin <LinkPin(s)>'];
handler.tags = ['downloader'];
handler.command = /^(downloadpin|downloadpinterest)$/i;

export default handler;

async function pinterest(query) {
    if (query.match(/https?:\/\/[^\s]+/)) {
        let res = await fetch(`https://api.neoxr.eu/api/pin?url=${query}&apikey=pinaa`);
        let data = await res.json();
        return extractUrlsFromData(data);
    }
}

function extractUrlsFromData(data) {
    const urls = [];
    if (data.status && data.data) {
        const type = data.data.type;
        const url = data.data.url;
        if (type === 'jpg' || type === 'jpeg' || type === 'png' || type === 'gif' || type === 'mp4') {
            urls.push({ type, url });
        }
    }
    return urls;
}