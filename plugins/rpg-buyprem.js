/*let handler = async (m, { conn, text }) => {
    let user = global.db.data.users[m.sender];
    let now = new Date * 1;
    let chip = user.chip || 0;
    let jumlahHari = parseInt(text);
    if (!jumlahHari) return conn.reply(m.chat, `Silakan tentukan jumlah hari untuk membeli premium`, m)
    if (isNaN(jumlahHari)) return conn.reply(m.chat, `Harap masukkan jumlah hari yang valid`, m)
    
    let harga = jumlahHari * 1000; // Harga premium sesuai jumlah hari
    if (chip < harga) return conn.reply(m.chat, `❌ Maaf, uangmu tidak cukup untuk membeli premium. Kamu memerlukan ${harga} Chips untuk membeli premium ${jumlahHari} hari`, m);

    if (now < user.premiumTime) user.premiumTime += jumlahHari * 86400000; // Menambah waktu premium
    else user.premiumTime = now + jumlahHari * 86400000;

    user.chip -= harga; // Mengurangi uang pengguna

    user.premium = true;

    await conn.reply(m.chat, `✔️ Pembelian Premium berhasil!
        
📛 Nama: ${user.name}
📆 Hari: ${jumlahHari}
📉 Masa Aktif: ${time2now(user.premiumTime - now)}`, m);
}

handler.help = ['buyprem <jumlah hari>']
handler.tags = ['owner']
handler.command = /^(buyprem)$/i

handler.group = false
handler.rowner = false 

export default handler;

// Fungsi untuk mengonversi waktu menjadi format yang lebih mudah dibaca
function time2now(ms) {
    let seconds = ms / 1000;
    let day = parseInt(seconds / 86400);
    seconds = seconds % 86400;
    let hour = parseInt(seconds / 3600);
    seconds = seconds % 3600;
    let minutes = parseInt(seconds / 60);
    seconds = parseInt(seconds % 60);
    return `${day} hari ${hour} jam ${minutes} menit ${seconds} detik`;
}*/
/*
SCRIPT BY © VYNAA VALERIE 
•• recode kasih credits 
•• contacts: (t.me/VLShop2)
•• instagram: @vynaa_valerie 
•• (github.com/VynaaValerie) 
*/