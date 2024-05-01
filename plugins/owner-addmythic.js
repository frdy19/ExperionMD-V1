let handler = async (m, { conn, command, text, args }) => {
    if (!text) throw 'Format salah!\n\nTambah mythic: .addmythic <tag orang> <jumlah mythic>\nKurangi mythic: delmythic <tag orang> <jumlah mythic>'
    
    // Extracting the mentioned user and the mythic value from the command text
    let [who, mythicValue] = text.split(' ')
    if (!who) throw 'Tag orang yang akan diubah mythicnya!'
    if (isNaN(mythicValue)) throw 'Jumlah mythic harus angka!'

    // Converting mythicValue to a number
    mythicValue = parseInt(mythicValue)

    let user = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let users = global.db.data.users

    // Checking if the user is in the database, if not, initialize their mythic to 0
    if (!users[user]) users[user] = { mythic: 0 }

    // Determining whether to add or delove mythic based on the command
    if (command === 'addmythic') {
        // Adding the specified mythic to the user's account
        users[user].mythic += mythicValue
        conn.reply(m.chat, `Berhasil menambahkan ${mythicValue} mythic untuk @${user.split('@')[0]}!`, m)
    } else if (command === 'delmythic') {
        if (mythicValue > users[user].mythic) {
            // Set the user's mythic to 0 if the specified mythic is greater than the user's current mythic
            users[user].mythic = 0
            conn.reply(m.chat, `Berhasil mengurangi mythic untuk @${user.split('@')[0]}. mythic kini menjadi 0!`, m)
        } else {
            // deloving the specified mythic from the user's account
            users[user].mythic -= mythicValue
            conn.reply(m.chat, `Berhasil mengurangi ${mythicValue} mythic untuk @${user.split('@')[0]}!`, m)
        }
    }
}

handler.help = ['addmythic', 'delmythic']
handler.tags = ['owner']
handler.command = /^(add|del)mythic$/i
handler.owner = true
handler.group = true
export default handler