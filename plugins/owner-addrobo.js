let handler = async (m, { conn, command, text, args }) => {
    if (!text) throw 'Format salah!\n\nTambah robo: .addrobo <tag orang> <jumlah robo>\nKurangi robo: deloverobo <tag orang> <jumlah robo>'
    
    // Extracting the mentioned user and the robo value from the command text
    let [who, roboValue] = text.split(' ')
    if (!who) throw 'Tag orang yang akan diubah robonya!'
    if (isNaN(roboValue)) throw 'Jumlah robo harus angka!'

    // Converting roboValue to a number
    roboValue = parseInt(roboValue)

    let user = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let users = global.db.data.users

    // Checking if the user is in the database, if not, initialize their robo to 0
    if (!users[user]) users[user] = { robo: 0 }

    // Determining whether to add or delove robo based on the command
    if (command === 'addrobo') {
        // Adding the specified robo to the user's account
        users[user].robo += roboValue
        conn.reply(m.chat, `Berhasil menambahkan ${roboValue} robo untuk @${user.split('@')[0]}!`, m)
    } else if (command === 'deloverobo') {
        if (roboValue > users[user].robo) {
            // Set the user's robo to 0 if the specified robo is greater than the user's current robo
            users[user].robo = 0
            conn.reply(m.chat, `Berhasil mengurangi robo untuk @${user.split('@')[0]}. robo kini menjadi 0!`, m)
        } else {
            // deloving the specified robo from the user's account
            users[user].robo -= roboValue
            conn.reply(m.chat, `Berhasil mengurangi ${roboValue} robo untuk @${user.split('@')[0]}!`, m)
        }
    }
}

handler.help = ['addrobo', 'delrobo']
handler.tags = ['owner']
handler.command = /^(add|del)robo$/i
handler.rowner = true

export default handler