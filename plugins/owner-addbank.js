let handler = async (m, { conn, command, text, args }) => {
    if (!text) throw 'Format salah!\n\nTambah bank: addbank <tag orang> <jumlah bank>\nKurangi bank: delbank <tag orang> <jumlah bank>'
    
    // Extracting the mentioned user and the bank value from the command text
    let [who, bankValue] = text.split(' ')
    if (!who) throw 'Tag orang yang akan diubah banknya!'
    if (isNaN(bankValue)) throw 'Jumlah bank harus angka!'

    // Converting bankValue to a number
    bankValue = parseInt(bankValue)

    let user = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let users = global.db.data.users

    // Checking if the user is in the database, if not, initialize their bank to 0
    if (!users[user]) users[user] = { bank: 0 }

    // Determining whether to add or remove bank based on the command
    if (command === 'addbank') {
        // Adding the specified bank to the user's account
        users[user].bank += bankValue
        conn.reply(m.chat, `Berhasil menambahkan ${bankValue} bank untuk @${user.split('@')[0]}!`, m)
    } else if (command === 'delbank') {
        if (bankValue > users[user].bank) {
            // Set the user's bank to 0 if the specified bank is greater than the user's current bank
            users[user].bank = 0
            conn.reply(m.chat, `Berhasil mengurangi bank untuk @${user.split('@')[0]}. bank kini menjadi 0!`, m)
        } else {
            // Removing the specified bank from the user's account
            users[user].bank -= bankValue
            conn.reply(m.chat, `Berhasil mengurangi ${bankValue} bank untuk @${user.split('@')[0]}!`, m)
        }
    }
}

handler.help = ['addbank', 'delbank']
handler.tags = ['owner']
handler.command = /^(add|del)bank$/i
handler.rowner = true
handler.group = true
export default handler