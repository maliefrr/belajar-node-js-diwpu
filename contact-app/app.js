const contact = require('./contact')
const yargs = require('yargs')



yargs.command({
    command : 'add',
    describe : 'Menambahkan Kontak Baru',
    builder : {
        nama : {
            describe : "Nama Lengkap",
            demandOption: true,
            type : 'string'
        },
        nomorHP : {
            describe : 'Nomor Handphone',
            demandOption : true,
            type : 'string'
        },
        alamat : {
            describe : 'Alamat Lengkap',
            demandOption : true,
            type : 'string'
        },
    },
    handler(argv){
        contact.simpan(argv.nama,argv.nomorHP,argv.alamat)
    }
}).demandCommand();

yargs.command({
    command : 'list',
    describe : 'Menampilkan semua nama dan nomor telepon yang tersimpan',
    handler(){
        contact.list()
    }
})

yargs.command({
    command : 'detail',
    describe : 'Menammpilkan detail dari kontak',
    builder : {
        nama : {
            describe : 'Nama Kontak',
            type : 'string',
            demmandOption : true
        },
    },
    handler(argv){
        contact.detail(argv.nama)
    }
})

yargs.command({
    command: 'remove',
    describe : 'Menghapus kontak berdasarkan nama',
    builder : {
        nama : {
            describe : 'Nama Kontak yang akan dihapus',
            demmandOption : true,
            type : 'string'
        }
    },
    handler(argv){
        contact.remove(argv.nama)
    }
})


yargs.parse()

