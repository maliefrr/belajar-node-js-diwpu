const http = require('http')
const fs = require('fs')


const port = 3000;

http
    .createServer((req,res) => {
        // console.log(req.url);
        res.writeHead(200, {
            'Content-Type' : 'text/html'
        })
        if(req.url === '/about'){
            fs.readFile('./about.html',(err,data) => {
                if(err){
                    res.writeHead(404)
                    res.write('file not found')
                } else {
                    res.write(data)
                }
            })
        } else if(req.url === '/contact'){
            fs.readFile('./contact.html',(err,data) => {
                if(err){
                    res.writeHead(404)
                    res.write('file not found')
                } else {
                    res.write(data)
                }
            })
        }else {
            fs.readFile('./index.html',(err,data) => {
                if(err){
                    res.writeHead(404)
                    res.write('file not found')
                } else {
                    res.write(data)
                }
                res.end()
            })
        }
})
    .listen(port,() => {
        console.log(`Server berjalan di port ${port}....`)
    })