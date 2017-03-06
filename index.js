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

  socket.on('c2s xml', function (xml) {
    socket.broadcast.emit('s2c xml', xml)
  })

  socket.on('disconnect', () => console.log(`User ${socket.id} disconnected`))
})

server.listen(port, () => console.log(`http://localhost:${port}/`))
