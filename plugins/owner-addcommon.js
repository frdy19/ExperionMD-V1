let handler = async (m, { conn, command, text, args }) => {
    if (!text) throw 'Format salah!\n\nTambah common: .addcommon <tag orang> <jumlah common>\nKurangi common: delcommon <tag orang> <jumlah common>'
    
    // Extracting the mentioned user and the common value from the command text
    let [who, commonValue] = text.split(' ')
    if (!who) throw 'Tag orang yang akan diubah commonnya!'
    if (isNaN(commonValue)) throw 'Jumlah common harus angka!'

    // Converting commonValue to a number
    commonValue = parseInt(commonValue)

    let user = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let users = global.db.data.users

    // Checking if the user is in the database, if not, initialize their common to 0
    if (!users[user]) users[user] = { common: 0 }

    // Determining whether to add or delove common based on the command
    if (command === 'addcommon') {
        // Adding the specified common to the user's account
        users[user].common += commonValue
        conn.reply(m.chat, `Berhasil menambahkan ${commonValue} common untuk @${user.split('@')[0]}!`, m)
    } else if (command === 'delcommon') {
        if (commonValue > users[user].common) {
            // Set the user's common to 0 if the specified common is greater than the user's current common
            users[user].common = 0
            conn.reply(m.chat, `Berhasil mengurangi common untuk @${user.split('@')[0]}. common kini menjadi 0!`, m)
        } else {
            // deloving the specified common from the user's account
            users[user].common -= commonValue
            conn.reply(m.chat, `Berhasil mengurangi ${commonValue} common untuk @${user.split('@')[0]}!`, m)
        }
    }
}

handler.help = ['addcommon', 'delcommon']
handler.tags = ['owner']
handler.command = /^(add|del)common$/i
handler.owner = true
handler.group = true
export default handler