const fs = require('fs')
const tes = require('./tes')


// fs.writeFile('./data/tes.txt',tes.cetakNama('Mohamad Alief Rizky Ramadhan'), (err) => {
//     if(err){
//         console.log(err)
//     }else {
//         console.log('data berhasil di tulis')
//     }
// });

// fs.readFile('./data/tes.txt','utf-8',(err,res) => {
//     if(err){
//         console.log(err);
//     }
//     console.log(res)
// })

const readline = require('readline');

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

rl.question("Masukkan Nama Anda : ",(name) => {
    rl.question("Masukkan Nomor Handphone Anda : ", (nomor) => {
        let data = {
            name,nomor
        }
        let file = fs.readFileSync('./data/contacts.json','utf-8')
        const contacts = JSON.parse(file)
        contacts.push(data)
        fs.writeFileSync('./data/contacts.json',JSON.stringify(contacts))
        console.log('Data Telah Tersimpan')
        rl.close()
    })
})