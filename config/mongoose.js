const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/contact_list_db');

const  db = mongoose.connection

db.on('error',console.error.bind(console,'Error Connecting To Database'))

db.once('open',function(){
    console.log('Successful Connecting To the Database')
});