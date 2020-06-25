var socket = io()

socket.on('agent/message',(payload)=>{
    console.log('agent/message',payload)
})

socket.on('agent/connected',(payload)=>{
    console.log('agent/connected',payload)
})
socket.on('agent/disconnected',(payload)=>{
    console.log('agent/disconnecte',payload)
})
setTimeout(()=>{
    socket.emit('agent/message','hello server'),
2000})