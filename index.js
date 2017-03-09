const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 3000

var io = socketio(server)

app.use(express.static(__dirname + '/public'))

io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected`)

  socket.emit('build workspace')

  socket.on('new xml', (data) => {
  	socket.broadcast.emit('rebuild workspace', data)
  })

  socket.on('disconnect', () => console.log(`User ${socket.id} disconnected`))
})

server.listen(port, () => console.log(`http://localhost:${port}/`))
