const express =require('express')
const router= express.Router()
const path =require('path')
const app=express()



router.get('/', function(req,res){
    res.redirect('http://localhost:3000/login')
})
router.get('/login',function(res,res){
    res.sendFile(path.join(__dirname,'../../public/login.html'))
})


router.post('/chat',function(req,res){
    const joinCode=req.body.password
    if(joinCode==='161632')
    {
        res.cookie('name',req.body.name)
        res.sendFile(path.join(__dirname,'../../public/index.html'))
    }
    else{
        res.send('join code wrong')
    }
    
   
})







module.exports=router