const http = require('http')
const app = require('./src/app')
const connectDb = require('./src/db/db')
connectDb()



const server = require('http').createServer(app);
const io = require('socket.io')(server,{
   cors:{
      origin:"*"
   }
});
io.on('connection', socket => {
   const projectId = socket.handshake.query.projectId

   socket.join(projectId)

   socket.on('message', msg=>{
      socket.broadcast.to(projectId).emit('message', msg)
   })

 console.log("user Connected")
});


 server.listen(3001, ()=>{
    console.log("server is running")
 })