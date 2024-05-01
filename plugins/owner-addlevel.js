let handler = async (m, { conn, command, text, args }) => {
    if (!text) throw 'Format salah!\n\nTambah level: .addlevel <tag orang> <jumlah level>\nKurangi level: dellevel <tag orang> <jumlah level>'
    
    // Extracting the mentioned user and the level value from the command text
    let [who, levelValue] = text.split(' ')
    if (!who) throw 'Tag orang yang akan diubah levelnya!'
    if (isNaN(levelValue)) throw 'Jumlah level harus angka!'

    // Converting levelValue to a number
    levelValue = parseInt(levelValue)

    let user = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let users = global.db.data.users

    // Checking if the user is in the database, if not, initialize their level to 0
    if (!users[user]) users[user] = { level: 0 }

    // Determining whether to add or delove level based on the command
    if (command === 'addlevel') {
        // Adding the specified level to the user's account
        users[user].level += levelValue
        conn.reply(m.chat, `Berhasil menambahkan ${levelValue} level untuk @${user.split('@')[0]}!`, m)
    } else if (command === 'dellevel') {
        if (levelValue > users[user].level) {
            // Set the user's level to 0 if the specified level is greater than the user's current level
            users[user].level = 0
            conn.reply(m.chat, `Berhasil mengurangi level untuk @${user.split('@')[0]}. level kini menjadi 0!`, m)
        } else {
            // deloving the specified level from the user's account
            users[user].level -= levelValue
            conn.reply(m.chat, `Berhasil mengurangi ${levelValue} level untuk @${user.split('@')[0]}!`, m)
        }
    }
}

handler.help = ['addlevel', 'dellevel']
handler.tags = ['owner']
handler.command = /^(add|del)level$/i
handler.owner = true
handler.group = true
export default handler