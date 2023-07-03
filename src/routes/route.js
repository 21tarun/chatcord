
const express =require('express')
const router= express.Router()

const messageModel= require('../models/messageModel')
const userModel=require('../models/userModel')



router.get('/', function(req,res){

    res.redirect('/login')
})
router.get('/login',function(req,res){
    res.render('../views/login')
})

router.get('/dataInHighSecurity',async function (req,res){
    const data =await messageModel.find().sort({dateTime:1})
    res.json(data)

})

router.get('/register',function(req,res){
    res.render('../views/signUp')
})


router.post('/registeration',async function(req,res){
    try{
        const data =req.body
        const createData={}
        if(data.name.length<4) return res.json({ message: "user name lenght shoud be greater than 4" })
        if (!(data.name).match(/^[a-zA-Z0-9_]+$/)) return res.json({ message: "give valid user name" })    
        const name = await userModel.findOne({userName:data.name})
        if(name) return res.json({ message: "user name already exist" })
        createData.userName=data.name
    
        if(data.password!="") data.password=data.password.trim()
        if (data.password.length < 5 || data.password.length > 15) return res.json({message: "password length should be in range 8-15" });
        if (!(data.password.match(/.*[a-zA-Z]/))) return res.json({ message: "Password should contain alphabets" }) // password must be alphabetic //
        if (!(data.password.match(/.*\d/))) return res.json({ message: "Password should contain digits" })// we can use number also //
        createData.password=data.password
    

    
        await userModel.create(createData)
        res.redirect('/login')
    
    }
    catch(err){
        return res.json({message:err.message})
    }

 
})
router.post('/chat', async function(req,res){
    const data =req.body
    const user = await userModel.findOne({userName:data.name, password:data.password})
    if(!user) return res.json({message:"username password wrong"})
    console.log(user)

    res.cookie('name',req.body.name).render('../views/index',{name:req.body.name})
    


    
   
})







module.exports=router