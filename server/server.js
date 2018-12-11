import express from 'express'
import path from 'path'
import SocketIO from 'socket.io'
import http from 'http'

const app = express()

let server = http.createServer(app)

const publicPath = path.resolve(__dirname, '../public')
const port = process.env.PORT || 3000

app.use(express.static(publicPath))

//Server Communication
export let io = SocketIO(server)
require('./sockets/socket')

server.listen(port, err => {
	if (err) throw new Error()

	console.log(`Listening server at port ${port}`)
})
