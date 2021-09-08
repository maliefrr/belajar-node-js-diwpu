const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const { body, validationResult,check } = require('express-validator');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')
const app = express()

const {loadContact,findContact,addContact,cekDuplicat,deleteContact,updateContacts} = require('./utils/contacts')

app.set('view engine','ejs');
app.set('views','./views');
app.use(expressLayouts)
app.use(express.urlencoded({extended : true}))
//membuat express dapat mengakses file kita
app.use(express.static('public'))


// konfigurasi untuk flash message

app.use(cookieParser('secret'))
app.use(session({
    cookie : {maxAge : 6000},
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}))
app.use(flash())

console.log('Listening at http://localhost:3000');

app.get('/',(req,res) => {
    res.render('index',{layout:'main-layout',
                        title:'Halaman Home'})
})

app.get('/about',(req,res) => {
    res.render('about', {nama : "Mohamad Alief",
                        layout:'main-layout',
                        title:'Halaman About'})
})

app.get('/contact',(req,res) => {
    const contacts = loadContact()
    res.render('contact',{layout:'main-layout',
                        title:'Halaman Contact',
                    contacts,
                    msg : req.flash('msg')})
})

// halaman tambah data
app.get('/contact/add',(req,res) => {
    res.render('add-contact',{title:"Form Tambah Data Contact",
                            layout:'main-layout'})

})

// proses data contact

app.post('/contact',

    [
        check('email','email tidak valid').isEmail(),
        check('nohp','nomor handphone tidak valid').isMobilePhone('id-ID'),
        body('nama').custom(value => {
            const duplikat = cekDuplicat(value);
            if(duplikat){
                throw new Error('Nama sudah terdaftar');
            }
            return true;
        })

    ]

    ,(req,res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('add-contact',{title:"Form Tambah Data Contact",
                            layout:'main-layout',
                            error : errors.array()})
        }else{
            addContact(req.body)
            req.flash('msg' ,'Data Berhasil Ditambahkan!!')
            res.redirect('/contact')
        }
})


// proses delete contact
app.get('/contact/delete/:nama',(req,res) => {
    const contacts = findContact(req.params.nama)
    if(!contacts){
        res.status(404)
        res.send('<h1>404</h1>')
    } else {
        req.flash('msg' ,'Data Berhasil Dihapus!!')
        res.redirect('/contact')
        deleteContact(req.params.nama)
    }
})


// halaman edit data
app.get('/contact/edit/:nama',(req,res) => {
    const contact = findContact(req.params.nama)
    res.render('edit-contact',{title:"Form Edit Data Contact",
                                layout:'main-layout',
                                contact})

})

// proses edit
app.post('/contact/update',

    [
        check('email','email tidak valid').isEmail(),
        check('nohp','nomor handphone tidak valid').isMobilePhone('id-ID'),
        body('nama').custom((value , {req}) => {
            const duplikat = cekDuplicat(value);
            if(value !== req.body.oldName && duplikat){
                throw new Error('Nama sudah terdaftar');
            }
            return true;
        })

    ]

    ,(req,res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('edit-contact',{title:"Form Edit Data Contact",
                            layout:'main-layout',
                            error : errors.array(),
                            contact : req.body})
        }else{
            updateContacts(req.body)
            req.flash('msg' ,'Data Berhasil Diubah!!')
            res.redirect('/contact')
        }
})

// halaman detail contact
app.get('/contact/:nama',(req,res) => {
    const contact = findContact(req.params.nama)
    res.render('details',{layout:'main-layout',
                        title:'Halaman Detail Contact',
                        contact})
})

app.get('*',(req,res) => {
    res.send('<h1>404</h1>')
})

app.listen(3000)