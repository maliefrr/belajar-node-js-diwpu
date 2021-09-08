const fs = require('fs')

// mengecek apakah direktori tersedia atau tidak jika tidak tersedia maka direktori akan dibuat
if(!fs.existsSync('./data')){
    fs.mkdirSync('./data')
}


// mengecek apakah file tersedia atau tidak jika tidak tersedia maka file akan dibuat secara otomatis 
if(!fs.existsSync('./data/contacts.json')){
    fs.writeFileSync('./data/contacts.json','[]','utf-8')
}


// mengambil semua data di contacts.json
const loadContact = () => {
    const data = fs.readFileSync('./data/contacts.json','utf-8')
    const fileContact = JSON.parse(data)
    return fileContact
}

const findContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.nama === nama)

    return contact
}

// menambahkan / menimpa file contacts.json
const saveContacts = (contacts) => {
    fs.writeFileSync('data/contacts.json',JSON.stringify(contacts))
}

// menambahkan data contact baru

const addContact = (contact) => {
    const contacts = loadContact();
    contacts.push(contact)
    saveContacts(contacts)
}

// cek nama yang duplikat 
const cekDuplicat = (nama) => {
    const contacts = loadContact();
    return contacts.find((contact) => contact.nama === nama)
}

const deleteContact = (nama) => {
    const contacts = loadContact()
    const filterredContact = contacts.filter((contact) => contact.nama !== nama)
    saveContacts(filterredContact)
}

const updateContacts = (contactBaru) => {
    const contacts = loadContact();
    const filterredContact = contacts.filter((contact) => contact.nama !== contactBaru.oldName)
    delete contactBaru.oldName
    filterredContact.push(contactBaru)
    saveContacts(filterredContact)
}

module.exports = {loadContact, findContact,addContact,cekDuplicat,deleteContact,updateContacts}