let handler = async (m, { conn, command, text, args }) => {
    if (!text) throw 'Format salah!\n\nTambah emerald: .addemerald <tag orang> <jumlah emerald>\nKurangi emerald: delemerald <tag orang> <jumlah emerald>'
    
    // Extracting the mentioned user and the emerald value from the command text
    let [who, emeraldValue] = text.split(' ')
    if (!who) throw 'Tag orang yang akan diubah emeraldnya!'
    if (isNaN(emeraldValue)) throw 'Jumlah emerald harus angka!'

    // Converting emeraldValue to a number
    emeraldValue = parseInt(emeraldValue)

    let user = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let users = global.db.data.users

    // Checking if the user is in the database, if not, initialize their emerald to 0
    if (!users[user]) users[user] = { emerald: 0 }

    // Determining whether to add or delove emerald based on the command
    if (command === 'addemerald') {
        // Adding the specified emerald to the user's account
        users[user].emerald += emeraldValue
        conn.reply(m.chat, `Berhasil menambahkan ${emeraldValue} emerald untuk @${user.split('@')[0]}!`, m)
    } else if (command === 'delemerald') {
        if (emeraldValue > users[user].emerald) {
            // Set the user's emerald to 0 if the specified emerald is greater than the user's current emerald
            users[user].emerald = 0
            conn.reply(m.chat, `Berhasil mengurangi emerald untuk @${user.split('@')[0]}. emerald kini menjadi 0!`, m)
        } else {
            // deloving the specified emerald from the user's account
            users[user].emerald -= emeraldValue
            conn.reply(m.chat, `Berhasil mengurangi ${emeraldValue} emerald untuk @${user.split('@')[0]}!`, m)
        }
    }
}

handler.help = ['addemerald', 'delemerald']
handler.tags = ['owner']
handler.command = /^(add|del)emerald$/i
handler.owner = true
handler.group = true
export default handler