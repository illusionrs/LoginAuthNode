const express = require('express')
const mongoose =require('mongoose')
const User = require('../models/User.js')
const bcrypt = require('bcrypt')

const router = express.Router();

router.post('/send', async (req,res)=>{

    try{
    
     let { name, password, passwordCheck, email} = req.body

     if(!email || !password || !passwordCheck)
     {
         return res.status(400).json({ msg: "Not all fields entered"})
     }

     if(password.length<5)
     {
        return res.status(400).json({ msg: "Password length should be atleast 5 character."})
     }

     if(password!=passwordCheck)
     {
        return res.status(400).json({ msg: "Password should be same."})
     }

     const existUser = User.findOne({email:email})
    //  console.log(existUser)

     if(existUser){
         return res.status(400).json({ msg: "User Exists.."})
     }

     if(!name) name = email;

     const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

     const newUser = new User({
         email,
         password:passwordHash,
         name
     })

     const saveUser = await newUser.save();

     res.json(saveUser)

    }

    catch(err) {
        res.status(500).json({ error: err.message });
      }


})



router.post('/login',async (req,res)=>{


    try{
    
        let { email,password} = req.body
   
        if(!email || !password)
        {
            return res.status(400).json({ msg: "Not all fields entered"})
        }
   
        const user = await User.findOne({ email: email });

        if(!user){
            return res.status(400).json({msg: "Account Not Found."})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({
            token,
            user: {
              id: user._id,
              name: user.name,
            },
          });
       





   
       }
   
       catch(err) {
           res.status(500).json({ error: err.message });
         }




})

module.exports =router ;
