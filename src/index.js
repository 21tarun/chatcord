const express =require('express')
const app = express()
const http =require('http')
const socket =require('socket.io')
const route =require('./routes/route')
const path=require('path')





const server= http.createServer(app)

app.use(express.urlencoded());

app.use('/chat',express.static(path.join(__dirname,'../public')))

app.use('/',route)



const io =socket(server) // here socket will work on this "server" server


io.on('connection',function(socket){
    console.log('new connection....')

    

    socket.on('message',function(msg){
        console.log(msg)
        
        socket.broadcast.emit('message',msg)
    })
    socket.on('user',function(name){
        console.log(name)
        socket.broadcast.emit('user',name)
    })
})


server.listen(3000, function(){
    console.log("server is running ",3000)
})