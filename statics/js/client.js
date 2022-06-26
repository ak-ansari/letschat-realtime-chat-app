const socket = io();
const textarea= document.querySelector('#input');
const chatarea= document.querySelector('.chatarea');
let j=0

do{
   user= prompt('please enter your name')
}
while(!user)


socket.emit('join',user);
socket.on('join',(user)=>{
   let div= document.createElement('div')
   div.className='event'
   div.innerHTML=`<h4> ${user} joind the chat </h4>`;
   chatarea.appendChild(div)
});

socket.on("left", (obj) => {
    let div = document.createElement("div");
    div.className = "event";
    div.innerHTML = `<h4> ${obj} left </h4>`;
    chatarea.appendChild(div);


});

textarea.addEventListener('keyup',(e)=>{
   if(e.key==='Enter'){
      console.log(j);
      showdata(e.target.value)
   }
})
function showdata(data){
   let object = {
     user: user,
     msg: data,
     data: data.trim(),
   };
   appendChild(object,'outgoing');
   socket.emit('message',object)
   scrollToBottom()
   
}

function appendChild(object,type){
   let newdiv = document.createElement("div");
   let msgdiv = document.createElement("div");
   newdiv.classList.add(type);
   msgdiv.classList.add("messaging_area");

   let html = `<h4>${object.user}</h4><p>${object.msg}</p>`;
   newdiv.innerHTML = html;
   msgdiv.appendChild(newdiv);
   chatarea.appendChild(msgdiv)

   // console.log(html);

   textarea.value = "";
}

socket.on('message',(object)=>{
   appendChild(object,'incoming')
   scrollToBottom()
})



function scrollToBottom() {
  chatarea.scrollTop = chatarea.scrollHeight;
}




