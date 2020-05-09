const http = require('http')
const app  = require('./app')

//defining the port 
const  port = 4000

//creating the server
const server = http.createServer(app)

server.listen(port,function(){
    console.log('port 4000 has been acivated')
})