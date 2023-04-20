const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const empCollection = require('./model/model');

const temp_path = path.join(__dirname, '../template/views');
require('./db/db');
app.set('view engine', 'hbs');
app.set('views', temp_path);



app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));


app.get('/',(req, res) => {
    res.render('index')
} );


 // for getting email on screen
// app.post('/empdata', async (req ,res) => {
//     console.log("hello",req.body);
//     res.send(req.body.email);
// })

//for matching password
app.post('/empdata', async(req , res) => {
    try{
        const password = req.body.password;
    const cpassword = req.body.cpassword;
    
    if(password === cpassword) {
        const empData = new empCollection({
            email : req.body.email,
            password : req.body.password,
            cpassword : req.body.cpassword
        })

        const postData = await empData.save();
        res.send(postData);
    }else {
        res.send("password are not matching");
    }

    }catch (error) {
        res.send(error);
    }
})



app.listen(port , () => {
    console.log(`listening to the port ${port}`);
})

