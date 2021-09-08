const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/mydb', {useNewUrlParser: true, 
                                                    useUnifiedTopology: true,
                                                    useCreateIndex : true});

// membuat schema



// tes menambahkan 1 data

// const contact1 = new Contact({
//     nama : "Mohamad Alief Rizky Ramadhan",
//     nohp : '081363818152',
//     email : 'aliefm144@gmail.com'
// })

