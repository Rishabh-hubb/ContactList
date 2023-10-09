const express =require('express')
const path = require('path')
const bodyParser = require('body-parser')
const port = 8000;

const db = require('./config/mongoose')
const Contact = require('./model/Contact')

app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('assets'))

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))


// let contactList = [
//     {
//         name:"Rishabh",
//         phone:'8582532352'
//     },
//     {
//         name:"Arpan",
//         phone:'6363636336'
//     },
//     {
//         name:"evans",
//         phone:'858256632352'
//     },
// ]
app.get('/', async function(req,res){
    let contacts = await Contact.find({})
    return res.render('home',{
        title:'HomePage',
        contact_list: contacts,
    })
        
})



app.post('/create-contact',function(req,res){
    Contact.create({
        name:req.body.my_name,
        phone:req.body.phone
    })
    /*
    contactList.push({
        name:req.body.my_name,
        phone:req.body.phone
   })
    */
   

    return res.redirect('/')
})


app.get('/delete-contact/:id',async function(req,res){
    let id=req.params.id
    console.log(id)
    await Contact.findByIdAndDelete(id)
    return res.redirect('/')
    /*
    let idx  = contactList.findIndex(contact => contact.phone == phone)
    if(idx != -1){
        contactList.splice(idx,1)
    }
    return res.redirect('back')
    */
})

app.listen(port,function(err){
    if(err){
        console.log(err)
    }
})