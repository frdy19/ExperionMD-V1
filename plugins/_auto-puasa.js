export async function before(m) {
    this.autosholat = this.autosholat ? this.autosholat : {}
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender
    let id = m.chat
    if (id in this.autosholat) {
        return false
    }
    let jadwalSholat = {
        Buka: "18:23",
        Tarawih: "19:35",
        Sahur: "03:00",
        Imsak: "04:54",
    }
    const date = new Date((new Date).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    }));
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    for (const [sholat, waktu] of Object.entries(jadwalSholat)) {
        if (timeNow === waktu) {
            let caption = "";
            if (sholat === "Buka") {
                caption = `Kepasar beli ketan, Ketannya dibakar pakai areng, Ada ucapan berbuka dari mantan, Katanya kapan mau buka bareng 😁
                
_Waktunya berbuka puasa 🍽_ (${waktu}) untuk wilayah *Pekanbaru dan sekitarnya*`;
            } else if (sholat === "Sahur") {
                caption = `_Sahurr oyy sahurr sahurrr, gak sahur gua habisin lauknya 😁🤤_ 
 
 (${waktu}) _Waktu Sahur telah tiba_ untuk wilayah *Pekanbaru dan sekitarnya*`;
            } else if (sholat === "Imsak") {
                caption = `_Waktunya imsak 🌙_ (${waktu})`;
            } else if (sholat === "Tarawih") {
                caption = `_Waktunya shalat tarawih 🕌_ (${waktu})`;
            }

            this.autosholat[id] = [
                this.reply(m.chat, caption, null, {
                    contextInfo: {
                        mentionedJid: [who]
                    }
                }),
                setTimeout(() => {
                    delete this.autosholat[id]
                }, 57000)
            ]
        }
    }
}
export const disabled = false
/*
SCRIPT BY © VYNAA VALERIE 
•• recode kasih credits 
•• contacts: (t.me/VLShop2)
•• instagram: @vynaa_valerie 
•• (github.com/VynaaValerie) 
*/