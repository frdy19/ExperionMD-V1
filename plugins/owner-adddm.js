let handler = async (m, { conn, command, text, args }) => {
    if (!text) throw 'Format salah!\n\nTambah diamond: .adddiamond <tag orang> <jumlah diamond>\nKurangi diamond: deldiamond <tag orang> <jumlah diamond>'
    
    // Extracting the mentioned user and the diamond value from the command text
    let [who, diamondValue] = text.split(' ')
    if (!who) throw 'Tag orang yang akan diubah diamondnya!'
    if (isNaN(diamondValue)) throw 'Jumlah diamond harus angka!'

    // Converting diamondValue to a number
    diamondValue = parseInt(diamondValue)

    let user = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let users = global.db.data.users

    // Checking if the user is in the database, if not, initialize their diamond to 0
    if (!users[user]) users[user] = { diamond: 0 }

    // Determining whether to add or delove diamond based on the command
    if (command === 'adddiamond') {
        // Adding the specified diamond to the user's account
        users[user].diamond += diamondValue
        conn.reply(m.chat, `Berhasil menambahkan ${diamondValue} diamond untuk @${user.split('@')[0]}!`, m)
    } else if (command === 'deldiamond') {
        if (diamondValue > users[user].diamond) {
            // Set the user's diamond to 0 if the specified diamond is greater than the user's current diamond
            users[user].diamond = 0
            conn.reply(m.chat, `Berhasil mengurangi diamond untuk @${user.split('@')[0]}. diamond kini menjadi 0!`, m)
        } else {
            // deloving the specified diamond from the user's account
            users[user].diamond -= diamondValue
            conn.reply(m.chat, `Berhasil mengurangi ${diamondValue} diamond untuk @${user.split('@')[0]}!`, m)
        }
    }
}

handler.help = ['adddiamond', 'deldiamond']
handler.tags = ['owner']
handler.command = /^(add|del)diamond$/i
handler.owner = true
handler.group = true
export default handler