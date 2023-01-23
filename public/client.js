
const socket = io()  // add socket.io to frontend javascript

let name;

//getting name form login form
var allcookies = document.cookie.split(";")
for (let i=0;i<allcookies.length;i++) {
    if (allcookies[i].match("name=")){
        name=allcookies[i].slice('name='.length)
    }
}


let textarea=document.querySelector('#textarea')
let messageArea=document.querySelector('.message__area')
let liveUsers=document.querySelector('.live')

document.querySelector('.brand2').innerHTML=`<h1>${name} say, dora dora</h1>`


if(name!='')
{
    appendLiveUser(name)
    socket.emit('user',name)
    
}


// methods for sending messages via 'ENTER'key or from the front end button

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
    let copy_msg={...msg}
    let mainDiv =document.createElement('div')
    if(type=='outgoing') copy_msg.user='You'
    let className=type
    mainDiv.classList.add(className,'message')
    let markup=`
        <h4>${copy_msg.user}</h4>
        <p>${copy_msg.message}</p>
    `
    mainDiv.innerHTML=markup
    messageArea.appendChild(mainDiv)
}

function appendJoinedMessage(info,type){
    let mainDiv =document.createElement('div')
    let className=type
    mainDiv.classList.add(className,'message')
    let markup=`
        <p>${info} has joined the chat</p>
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
    appendJoinedMessage(name,'joinner')
})

function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}