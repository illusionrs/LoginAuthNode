const express= require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require("dotenv").config();


const app=express()
app.use(express.json());
app.use(cors());


const PORT= process.env.PORT || 5000
mongoose.connect("mongodb+srv://rajeev255:rajeev123@cluster0-uyau0.mongodb.net/EmployeeDb?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});



mongoose.connection.on('connected',()=> console.log('connected'))

app.get('/get',(req,res)=>{
    res.send( '<h1>HELLO </h1>')
})

app.listen(PORT,()=> console.log("working"))

app.use('/user',require('./routes/User.js'))



