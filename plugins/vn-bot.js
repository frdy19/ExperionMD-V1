import fetch from 'node-fetch';
import fs from 'fs';

let handler = async (m, { conn }) => {
  let text = `Vynaa Is online Sirr`;

  // Unduh gambar thumbnail
  let response = await fetch("https://telegra.ph/file/a290673bdf46d695000bc.jpg");
  let thumbnailBuffer = await response.buffer();

  conn.sendFile(
    m.chat,
    "./vn/yuhumina.mp3",
    "yuhumina.mp3",
    text,
    m,
    true,
    {
      type: "audioMessage",
      ptt: true,
      mimetype: 'audio/mp4',
      fileName: "yuhumina.mp3",
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 2,
          mediaUrl: "url_audio",
          title: "Vynaa is online",
          body: "ada yang bisa vynaa bantu?",
          sourceUrl: "url_audio",
          thumbnail: thumbnailBuffer // Menggunakan buffer gambar thumbnail
        }
      }
    }
  );
};

handler.customPrefix = /^(bot|vynaa|hay|hai|p|sayang|pina)$/i;
handler.command = new RegExp();

export default handler;