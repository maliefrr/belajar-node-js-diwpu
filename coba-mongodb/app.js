const {MongoClient} = require('mongodb')

const uri = "mongodb://127.0.0.1:27017"
const dbName = "mytable"

const client = new MongoClient(uri)

client.connect((error,client) => {
    if(error){
       return  console.log("Koneksi Gagal")
    }
    console.log("Koneksi Berhasil")
})