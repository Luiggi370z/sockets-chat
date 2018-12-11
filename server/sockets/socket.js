import { io } from '../server'
import Users from '../classes/users'
import { CreateMessage } from '../utils'

const users = new Users()

io.on('connect', client => {
	client.on('joinChat', (user, callback) => {
		if (!user.name || !user.room)
			return callback({
				error: true,
				message: 'Name / Room are required.'
			})

		client.join(user.room)

		let connectedUsers = users.addUser({
			id: client.id,
			name: user.name,
			room: user.room
		})

		client.to(user.room).emit('usersList', users.getUserByRoom(user.room))
		client.broadcast
			.to(user.room)
			.emit(
				'notification',
				CreateMessage('Admin', `${user.name} has joined the room chat.`)
			)
		return callback(users.getUserByRoom(user.room))
	})

	client.on('sendMessage', (data, callback) => {
		let currentUser = users.getUser(client.id)

		const message = CreateMessage(currentUser.name, data.message)
		client.broadcast.to(currentUser.room).emit('sendMessage', message)
		callback(message)
	})

	client.on('disconnect', () => {
		let removedUser = users.removeUser(client.id)
		client.broadcast.emit(
			'notification',
			CreateMessage('Admin', `${removedUser.name} has left the room chat.`)
		)
		client.broadcast
			.to(removedUser.room)
			.emit('usersList', users.getUserByRoom(removedUser.room))
		return removedUser
	})

	client.on('privateMessage', data => {
		let currentUser = users.getUser(client.id)

		client.broadcast
			.to(data.to)
			.emit('privateMessage', CreateMessage(currentUser.name, data.message))
	})
})
