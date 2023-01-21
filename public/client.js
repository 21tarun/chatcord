




const socket = io()
let name;
var allcookies = document.cookie.split(";")
for (let i=0;i<allcookies.length;i++) {
    if (allcookies[i].match("name=")){
        name=allcookies[i].slice('name='.length+1)
    }
}


let textarea=document.querySelector('#textarea')
let messageArea=document.querySelector('.message__area')
let liveUsers=document.querySelector('.live')


if(name!='')
{
    appendLiveUser(name)
    socket.emit('user',name)
}


textarea.addEventListener('keyup',function(e){
    if(e.key==='Enter'){
        if(e.target.value.trim() !='') return  sendMessage(e.target.value)
        else return
    }
})

function send(){
    if(textarea.value.trim() !='') return  sendMessage(textarea.value)
    else return
}


function sendMessage(message){
    let msg={
        user:name,
        message:message.trim()
    }

    // append message on client side (outgoing message)
    appendMessage(msg,'outgoing')
    textarea.value=''
    scrollToBottom()

    //send messages to server
    socket.emit('message',msg)   // here message is like a key and msg is the value

  
}

function appendLiveUser(name){
    let mainDiv=document.createElement('div')
    mainDiv.classList.add('user')
    let markup=`
        <li>${name}</li>
    `
    mainDiv.innerHTML=markup

    liveUsers.appendChild(mainDiv)
}

function appendMessage(msg,type){
    let mainDiv =document.createElement('div')
    let className=type
    mainDiv.classList.add(className,'message')
    let markup=`
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML=markup
    messageArea.appendChild(mainDiv)
}


// recieve messages from server 

socket.on('message',function(msg){
    console.log(msg)
    // append message on client side (incomming message)
    appendMessage(msg,'incoming')
    scrollToBottom()
})
socket.on('user',function(name){
    appendLiveUser(name)
})

function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}