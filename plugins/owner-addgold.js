let handler = async (m, { conn, command, text, args }) => {
    if (!text) throw 'Format salah!\n\nTambah gold: .addgold <tag orang> <jumlah gold>\nKurangi gold: delgold <tag orang> <jumlah gold>'
    
    // Extracting the mentioned user and the gold value from the command text
    let [who, goldValue] = text.split(' ')
    if (!who) throw 'Tag orang yang akan diubah goldnya!'
    if (isNaN(goldValue)) throw 'Jumlah gold harus angka!'

    // Converting goldValue to a number
    goldValue = parseInt(goldValue)

    let user = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let users = global.db.data.users

    // Checking if the user is in the database, if not, initialize their gold to 0
    if (!users[user]) users[user] = { gold: 0 }

    // Determining whether to add or delove gold based on the command
    if (command === 'addgold') {
        // Adding the specified gold to the user's account
        users[user].gold += goldValue
        conn.reply(m.chat, `Berhasil menambahkan ${goldValue} gold untuk @${user.split('@')[0]}!`, m)
    } else if (command === 'delgold') {
        if (goldValue > users[user].gold) {
            // Set the user's gold to 0 if the specified gold is greater than the user's current gold
            users[user].gold = 0
            conn.reply(m.chat, `Berhasil mengurangi gold untuk @${user.split('@')[0]}. gold kini menjadi 0!`, m)
        } else {
            // deloving the specified gold from the user's account
            users[user].gold -= goldValue
            conn.reply(m.chat, `Berhasil mengurangi ${goldValue} gold untuk @${user.split('@')[0]}!`, m)
        }
    }
}

handler.help = ['addgold', 'delgold']
handler.tags = ['owner']
handler.command = /^(add|del)gold$/i
handler.owner = true
handler.group = true
export default handler