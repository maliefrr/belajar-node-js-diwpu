const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')
const { body, validationResult,check } = require('express-validator');
const methodOverride = require('method-override')
require('./utils/db');
const contact = require('./model/contact')
const app = express()
const port = 3000

// konfigurasi view engine
app.set('view engine','ejs');
app.set('views','./views');
app.use(expressLayouts)
app.use(express.urlencoded({extended : true}))
//membuat express dapat mengakses file kita
app.use(express.static('public'))


// konfigurasi flash
app.use(cookieParser('secret'))
app.use(session({
    cookie : {maxAge : 6000},
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}))
app.use(flash())

// konfigurasi method overide
app.use(methodOverride('_method'))



app.get('/',(req,res) => {
    res.render('home',{title : 'Halaman Utama',
                        layout : 'main-layout'})
})


app.get('/about',(req,res) => {
    res.render('about', {nama : "Mohamad Alief",
                        layout:'main-layout',
                        title:'Halaman About'})
})

app.get('/contact',async (req,res) => {
    const contacts = await contact.find()
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

// proses tambah data contact

app.post('/contact',

    [
        check('email','email tidak valid').isEmail(),
        check('nohp','nomor handphone tidak valid').isMobilePhone('id-ID'),
        body('nama').custom(async value => {
            const duplikat = await contact.findOne({nama : value});
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
            contact.insertMany(req.body,(error,result) => {
                req.flash('msg' ,'Data Berhasil Ditambahkan!!')
                res.redirect('/contact')
            })
        }
})


// proses delete contact
// app.get('/contact/delete/:nama',async (req,res) => {
//     const contacts = await contact.findOne({nama : req.params.nama})
//     if(!contacts){
//         res.status(404)
//         res.send('<h1>404</h1>')
//     } else {
//         contact.deleteOne({_id:contacts._id}).then((result) => {
//             req.flash('msg' ,'Data Berhasil Dihapus!!')
//             res.redirect('/contact')
//         })
//     }
// })

app.delete('/contact',(req,res) => {
    contact.deleteOne({nama : req.body.nama}).then((result) => {
        req.flash('msg','Data Berhasil Dihapus')
        res.redirect('/contact')
    })
})


// halaman edit data
app.get('/contact/edit/:nama',async(req,res) => {
    const contacts = await contact.findOne({nama : req.params.nama})
    res.render('edit-contact',{title:"Form Edit Data Contact",
                                layout:'main-layout',
                                contacts})

})

// proses edit
app.put('/contact/',

    [
        check('email','email tidak valid').isEmail(),
        check('nohp','nomor handphone tidak valid').isMobilePhone('id-ID'),
        body('nama').custom(async (value , {req}) => {
            const duplikat = await contact.findOne({nama : value});
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
            contact.updateOne({_id:req.body._id},{
                $set : {
                    nama : req.body.nama,
                    email : req.body.email,
                    nohp : req.body.nohp
                }
            }).then(result => {
                req.flash('msg' ,'Data Berhasil Diubah!!')
                res.redirect('/contact')
            })
        }
})

// halaman detail contact
app.get('/contact/:nama',async (req,res) => {
    const contacts = await contact.findOne({nama : req.params.nama})
    res.render('details',{layout:'main-layout',
                        title:'Halaman Detail Contact',
                        contacts})
})

app.get('*',(req,res) => {
    res.send('<h1>404</h1>')
})

app.listen(port,() => {
    console.log(`Mongo Contact App | Listening at http://localhost:${port}`)
})