const express = require('express')
const app = express()
const http = require('http')
const ws = require('ws')
const server = http.createServer(app)
const wss = new ws.Server({server: server})


wss.on('connection', (socket) => {
    socket.on('error', console.error)
    console.log('a user connected')
    socket.send('Welcome!')
    socket.on('message', (message, isBinary) => {
        wss.clients.forEach(function each(client) {
            if (client.readyState === ws.WebSocket.OPEN) {
              client.send(message, { binary: isBinary })
            }
        });
    })
})


app.get('/', (req, res) => { res.send('Hello') })

server.listen(3002, () => {
  console.log('listening on *:3002')
})


