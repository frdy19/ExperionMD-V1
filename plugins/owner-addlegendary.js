let handler = async (m, { conn, command, text, args }) => {
    if (!text) throw 'Format salah!\n\nTambah legendary: .addlegendary <tag orang> <jumlah legendary>\nKurangi legendary: dellegendary <tag orang> <jumlah legendary>'
    
    // Extracting the mentioned user and the legendary value from the command text
    let [who, legendaryValue] = text.split(' ')
    if (!who) throw 'Tag orang yang akan diubah legendarynya!'
    if (isNaN(legendaryValue)) throw 'Jumlah legendary harus angka!'

    // Converting legendaryValue to a number
    legendaryValue = parseInt(legendaryValue)

    let user = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let users = global.db.data.users

    // Checking if the user is in the database, if not, initialize their legendary to 0
    if (!users[user]) users[user] = { legendary: 0 }

    // Determining whether to add or delove legendary based on the command
    if (command === 'addlegendary') {
        // Adding the specified legendary to the user's account
        users[user].legendary += legendaryValue
        conn.reply(m.chat, `Berhasil menambahkan ${legendaryValue} legendary untuk @${user.split('@')[0]}!`, m)
    } else if (command === 'dellegendary') {
        if (legendaryValue > users[user].legendary) {
            // Set the user's legendary to 0 if the specified legendary is greater than the user's current legendary
            users[user].legendary = 0
            conn.reply(m.chat, `Berhasil mengurangi legendary untuk @${user.split('@')[0]}. legendary kini menjadi 0!`, m)
        } else {
            // deloving the specified legendary from the user's account
            users[user].legendary -= legendaryValue
            conn.reply(m.chat, `Berhasil mengurangi ${legendaryValue} legendary untuk @${user.split('@')[0]}!`, m)
        }
    }
}

handler.help = ['addlegendary', 'dellegendary']
handler.tags = ['owner']
handler.command = /^(add|del)legendary$/i
handler.owner = true
handler.group = true
export default handler