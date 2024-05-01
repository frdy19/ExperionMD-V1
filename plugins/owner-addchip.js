let handler = async (m, { conn, command, text, args }) => {
    if (!text) throw 'Format salah!\n\nTambah chip: .addchip <tag orang> <jumlah chip>\nKurangi chip: delovechip <tag orang> <jumlah chip>'
    
    // Extracting the mentioned user and the chip value from the command text
    let [who, chipValue] = text.split(' ')
    if (!who) throw 'Tag orang yang akan diubah chipnya!'
    if (isNaN(chipValue)) throw 'Jumlah chip harus angka!'

    // Converting chipValue to a number
    chipValue = parseInt(chipValue)

    let user = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let users = global.db.data.users

    // Checking if the user is in the database, if not, initialize their chip to 0
    if (!users[user]) users[user] = { chip: 0 }

    // Determining whether to add or delove chip based on the command
    if (command === 'addchip') {
        // Adding the specified chip to the user's account
        users[user].chip += chipValue
        conn.reply(m.chat, `Berhasil menambahkan ${chipValue} chip untuk @${user.split('@')[0]}!`, m)
    } else if (command === 'delovechip') {
        if (chipValue > users[user].chip) {
            // Set the user's chip to 0 if the specified chip is greater than the user's current chip
            users[user].chip = 0
            conn.reply(m.chat, `Berhasil mengurangi chip untuk @${user.split('@')[0]}. chip kini menjadi 0!`, m)
        } else {
            // deloving the specified chip from the user's account
            users[user].chip -= chipValue
            conn.reply(m.chat, `Berhasil mengurangi ${chipValue} chip untuk @${user.split('@')[0]}!`, m)
        }
    }
}

handler.help = ['addchip', 'delchip']
handler.tags = ['owner']
handler.command = /^(add|del)chip$/i
handler.owner = true
handler.group = true
export default handler