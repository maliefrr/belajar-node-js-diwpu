const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const app = express()
const port = 3000

app.set('view engine','ejs')
app.use(expressLayouts)

app.get('/',(req,res) => {
    res.render('index' , {title : "Home" , layout : 'layouts/layout'})
})

app.get('/about',(req,res) => {
    res.render('about', {nama : "Alief" , title : "Halaman About" , layout : 'layouts/layout'})
})

app.get('/contact',(req,res) => {
    res.render('contact' , {title : "Halaman Contact" , layout : 'layouts/layout'})
})

app.use('/', (req,res) => {
    res.status(404);
    res.send('<h1> Error:File Not Found </h1>')
})

app.listen(port,() => {
    console.log(`Server is running at http://localhost:${port}`)
})
