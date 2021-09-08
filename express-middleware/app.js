const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const app = express()

app.set('view engine','ejs');
app.set('views','./views');
app.use(expressLayouts)

//membuat express dapat mengakses file kita
app.use(express.static('public'))

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
    res.render('contact',{layout:'main-layout',
                        title:'Halaman Contact'})
})

app.get('*',(req,res) => {
    res.send('<h1>404</h1>')
})

app.listen(3000)