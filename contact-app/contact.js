const fs = require('fs')
const chalk = require('chalk')
const validator = require('validator')

// mengecek apakah direktori tersedia atau tidak jika tidak tersedia maka direktori akan dibuat
if(!fs.existsSync('./data')){
    fs.mkdirSync('./data')
}


// mengecek apakah file tersedia atau tidak jika tidak tersedia maka file akan dibuat secara otomatis 
if(!fs.existsSync('./data/contacts.json')){
    fs.writeFileSync('./data/contacts.json','[]','utf-8')
}



const loadContact = () => {
    const data = fs.readFileSync('./data/contacts.json','utf-8')
    const fileBuffer = JSON.parse(data)
    return fileBuffer
}

// menampilkan semua nama dan nomorhp yang tersimpan di contact
const list = () => {
    const contacts = loadContact()
    console.log(chalk.blueBright.inverse(`Daftar Kontak: `))
    contacts.forEach((contact,index) => console.log(`${index + 1}. ${contact.Nama} --- ${contact.NoHP}`))
}

// menampilkan detail dari suatu kontak
const detail = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.Nama.toLowerCase() === nama.toLowerCase())

    if(!contact){
        console.log(chalk.red.inverse('Nama yang anda cari tidak tersedia'))
        return false
    }
    console.log(chalk.cyan.inverse(`Detail Kontak dari ${contact.Nama}`))
    console.log(`Nama     : ${contact.Nama}
Alamat   : ${contact.Alamat}
Nomor HP : ${contact.NoHP}
    `)
    
}


// menyimpan data yang telah diinputkan kedalam suatu file
const simpan = (Nama,NoHP,Alamat) => {
    const contact = {Nama,NoHP,Alamat}
    const contacts = loadContact()
    const duplicateNumber = contacts.find((contact) => contact.NoHP === NoHP);
    const duplicateName = contacts.find((contact) => contact.Nama === Nama);
    


    // mengecek apakah format nomor handphone yang diinput adalah nomor handphone indonesia
    if(validator.isMobilePhone(NoHP,'id-ID') === false){
        console.log(chalk.red.inverse('Nomor Handphone tidak valid'))
        return false
    }


    // mengecek apakah nomor yang di input sudah terdaftar atau belum
    if(duplicateNumber){
        console.log(chalk.black.bgRed('Nomor HP telah terdaftar'));
        return false
    }

    if(duplicateName){
        console.log(chalk.red.inverse('Nama telah terdaftar di dalam kontak silahkan gunakan nama lain'));
        return false
    }
    
    contacts.push(contact)


    fs.writeFileSync('./data/contacts.json',JSON.stringify(contacts))
    console.log(chalk.green.inverse('Data Berhasil Disimpan'));
}


// menghapus sebuah kontak

const remove = (nama) => {
    const contacts = loadContact();
    const newContact = contacts.filter((contact) => contact.Nama.toLowerCase() !== nama.toLowerCase())

    if(contacts.length === newContact.length){
        console.log(chalk.red.inverse('Nama tidak ditemukan'));
        return false
    }
    fs.writeFileSync('./data/contacts.json',JSON.stringify(newContact));
    console.log(chalk.green.inverse(`${nama} telah berhasil dihapus`))
}


module.exports = {detail,simpan,list,remove}