let handler = async (m, { conn, text, usedPrefix }) => {
  if (isNaN(text)) {
    var number = text.split`@`[1];
  } else if (!isNaN(text)) {
    var number = text;
  }

  const format = (num) => {
    const n = String(num),
      p = n.indexOf(".");
    return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, (m, i) =>
      p < 0 || i < p ? `${m},` : m
    );
  };

  if (!text && !m.quoted)
    return conn.reply(m.chat, `Berikan nomor, tag, atau reply chat target`, m);

  try {
    var user = '';
    if (text) {
      user = number + "@s.whatsapp.net";
    } else if (m.quoted.sender) {
      user = m.quoted.sender;
    } else if (m.mentionedJid) {
      user = number + "@s.whatsapp.net";
    }
  } catch (e) {
    console.error(e);
  } finally {
    if (!user)
      return conn.reply(
        m.chat,
        `Target atau Nomor tidak ditemukan, mungkin sudah keluar atau bukan anggota grup ini`,
        m
      );

    let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : {};
    let participants = m.isGroup ? groupMetadata.participants : [];
    let users = m.isGroup ? participants.find((u) => u.jid == user) : {};
    
    if (user === m.sender)
      return conn.reply(m.chat, `Tidak bisa berpacaran dengan diri sendiri`, m);

    if (typeof global.db.data.users[user] == "undefined")
      return m.reply("Tidak terdaftar di database");

    let senderData = global.db.data.users[m.sender];
    let userData = global.db.data.users[user];

    if (
      senderData.pasangan != "" &&
      global.db.data.users[senderData.pasangan]?.pasangan == m.sender &&
      senderData.pasangan != user
    ) {
      var denda = Math.ceil((senderData.exp / 1000) * 20);
      senderData.exp -= denda;
      conn.reply(
        m.chat,
        `Kamu sudah berpacaran dengan @${
          global.db.data.users[senderData.pasangan].split("@")[0]
        }\n\nSilahkan putus dulu ${usedPrefix}putus @user untuk menembak @${
          user.split("@")[0]
        }\n\nsetia dong!\ndenda : ${format(denda)} (20%)`,
        m,
        {
          contextInfo: {
            mentionedJid: [user, senderData.pasangan],
          },
        }
      );
    } else if (userData.pasangan != "") {
      var pacar = userData.pasangan;
      if (global.db.data.users[pacar]?.pasangan == user) {
        var denda = Math.ceil((senderData.exp / 1000) * 20);
        senderData.exp -= denda;
        if (m.sender == pacar && senderData.pasangan == user)
          return conn.reply(
            m.chat,
            `Kamu sudah berpacaran dengan @${
              user.split("@")[0]
            }\n\nsetia dong!\ndenda : ${format(denda)} (20%)`,
            m,
            {
              contextInfo: {
                mentionedJid: [user],
              },
            }
          );
        conn.reply(
          m.chat,
          `Tau sopan santun dikit teman\n@${
            user.split("@")[0]
          } sudah berpacaran dengan @${
            pacar.split("@")[0]
          }\n\nSilahkan cari pasangan lain aja!\ndenda : ${format(
            denda
          )} (10%)*`,
          m,
          {
            contextInfo: {
              mentionedJid: [user, pacar],
            },
          }
        );
      } else {
        senderData.pasangan = user;
        conn.reply(
          m.chat,
          `Kamu baru saja mengajak @${
            user.split("@")[0]
          } berpacaran\n\nSilahkan menunggu jawabannya saja ya!\nKetik ${usedPrefix}terima @user atau ${usedPrefix}tolak @user`,
          m,
          {
            contextInfo: {
              mentionedJid: [user],
            },
          }
        );
      }
    } else if (userData.pasangan == m.sender) {
      senderData.pasangan = user;
      conn.reply(
        m.chat,
        `Selamat anda resmi berpacaran dengan @${
          user.split("@")[0]
        }\n\nSemoga langgeng dan bahagia selalu `,
        m,
        {
          contextInfo: {
            mentionedJid: [user],
          },
        }
      );
    } else {
      senderData.pasangan = user;
      conn.reply(
        m.chat,
        `Kamu baru saja mengajak @${
          user.split("@")[0]
        } berpacaran\n\nSilahkan menunggu jawabannya saja ya!\nKetik ${usedPrefix}terima @user atau ${usedPrefix}tolak @user`,
        m,
        {
          contextInfo: {
            mentionedJid: [user],
          },
        }
      );
    }
  }
};
handler.help = ["tembak"].map((v) => v + " *@tag*")
handler.tags = ["jadian"]
handler.command = /^(tembak)$/i
handler.group = true
handler.limit = true
export default handler