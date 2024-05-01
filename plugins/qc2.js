import { sticker } from '../lib/sticker.js'
import axios from 'axios'

const handler = async (m, { conn, args, name }) => { // add name to the arguments
    let text;
    let apiColor = '#000000'; // default color
    if (args.length >= 1) {
        const input = args.join(" ").split("|"); // split input into color and text
        if (input.length === 2) {
            const colorName = input[0].trim().toLowerCase(); // get color name
            text = input[1].trim(); // get text
            // mapping color names to hex values
            const colorMap = {
                'putih': '#FFFFFF',
                'hijau': '#00FF00',
                'kuning': '#FFFF00',
                'hitam': '#000000',
                'merah': '#FF0000'
                // add more colors if needed
            };
            // set color based on user input or default to black
            apiColor = colorMap[colorName] || apiColor;
        } else {
            throw "Format salah. Contoh penggunaan: .qc2 warna|textnya";
        }
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text;
    } else {
        throw "Input teks atau reply teks yang ingin dijadikan quote! xx format: .qc warna|textnya xx ";
    }
    if (!text) return m.reply('Masukkan teks');
    if (text.length > 100) return m.reply('Maksimal 100 teks!');

    const pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/320b066dc81928b782c7b.png');

    const obj = {
        "type": "quote",
        "format": "png",
        "backgroundColor": apiColor, // use selected color
        "width": 512,
        "height": 768,
        "scale": 2,
        "messages": [{
            "entities": [],
            "avatar": true,
            "from": {
                "id": 1,
                "name": m.name, // change m.sender to name
                "photo": {
                    "url": pp
                }
            },
            "text": text,
            "replyMessage": {}
        }]
    };

    try {
        const json = await axios.post('https://quote.btch.bz/generate', obj, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const buffer = Buffer.from(json.data.result.image, 'base64');
        const stiker = await sticker(buffer, false, global.stickpack, global.stickauth);
        if (stiker) return conn.sendFile(m.chat, stiker, 'Quotely.webp', '', m);
    } catch (error) {
        console.error(error);
        throw "Terjadi kesalahan saat membuat stiker.";
    }
}

handler.help = ['qc2'];
handler.tags = ['sticker'];
handler.command = /^(qc2)$/i;

export default handler;
/*
SCRIPT BY © VYNAA VALERIE 
•• recode kasih credits 
•• contacts: (t.me/VLShop2)
•• instagram: @vynaa_valerie 
•• (github.com/VynaaValerie) 
*/