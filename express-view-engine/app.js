const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const app = express()

app.set('view engine','ejs');
app.set('views','./views');
app.use(expressLayouts)

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

app.listen(3000)