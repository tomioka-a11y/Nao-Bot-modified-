import { createHash } from 'crypto'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { text, usedPrefix }) {
  let user = global.db.data.users[m.sender]
  if (user.registered === true) throw `Anda sudah terdaftar\nMau daftar ulang? ${usedPrefix}unreg <SERIAL NUMBER>`
  if (!Reg.test(text)) throw `Format salah\n*${usedPrefix}register nama.umur*`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw 'Nama tidak boleh kosong (Alphanumeric)'
  if (!age) throw 'Umur tidak boleh kosong (Angka)'
  age = parseInt(age)
  if (age > 120) throw 'Umur terlalu tua 😂'
  if (age < 16) throw 'Esempe dilarang masuk 😂'
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  m.reply(`
Daftar berhasil!

╭─「 Info 」
│ Nama: ${name}
│ Umur: ${age} tahun 
╰────
Serial Number: 
${sn}

Ketik *.rules* untuk melihat ketentuan penggunaan

Mendaftar berarti setuju dengan ketentuan
`.trim())
}

handler.help = ['daftar', 'register'].map(v => v + ' <nama>.<umur>')

handler.command = /^(daftar|reg(ister)?)$/i

export default handler
