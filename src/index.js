const express =require('express')
const app = express()
const http =require('http')
const socket =require('socket.io')
const route =require('./routes/route')
const cors = require('cors')
const path=require('path')
const mongoose = require('mongoose')
const messageModel =require('./models/messageModel')
app.use(cors())


app.set('view engine', 'ejs')

mongoose.set("strictQuery",true)

const server= http.createServer(app)
app.use(express.urlencoded());
app.use('/chat',express.static(path.join(__dirname,'views')))
app.use('/',route)











mongoose.connect("mongodb+srv://tarun21:tarun1616@cluster0.h0l8mir.mongodb.net/chatHistory",{
    useNewUrlParser:true
})
.then(function(){
    console.log("mongodb connected")
    // here socket will work on this "server" server


    const io =socket(server) 
    io.on('connection',function(socket){
        console.log('new connection....')
    
        
    
        socket.on('message',function(msg){
            // console.log(msg)
            
            socket.broadcast.emit('message',msg)
            let data={}
            data.name=msg.user
            data.message=msg.message

            const dateTime = new Date('2023-07-03T08:30:06.405Z');

            const formattedDate = dateTime.toLocaleDateString('en-IN');
            

            const formattedTime = dateTime.toLocaleTimeString('en-IN');
            
            data.dateTime=formattedDate +" "+formattedTime
            console.log(data)
            messageModel.create(data)
        })
        socket.on('user',function(name){
            console.log(name)
            socket.broadcast.emit('user',name)
        })
    })
})
.catch((err)=>console.log(err))



server.listen(3000, function(){
    console.log("server is running ",3000)
})