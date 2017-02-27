const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 3000

var io = socketio(server)

io.on('connection', (socket) => {
	console.log(`User ${socket.id} connected`)
})

app.use(express.static(__dirname + '/public'))

server.listen(port, () => console.log(`http://localhost:${port}/`))