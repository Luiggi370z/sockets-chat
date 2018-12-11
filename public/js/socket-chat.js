var socket = io()

var params = new URLSearchParams(window.location.search)

if (!params.has('name') || !params.has('room')) {
	window.location = 'index.html'
	throw new Error('Name and Room are required')
}

var user = {
	name: params.get('name'),
	room: params.get('room')
}

socket.on('connect', function() {
	console.log('Connected to server')

	socket.emit('joinChat', user, function(res) {
		renderUsers(res)
	})
})

socket.on('disconnect', function() {
	console.log('Connection with server lost!')
})

socket.on('sendMessage', function(msg) {
	renderMessage(msg, false)
})

socket.on('notification', function(msg) {
	renderMessage(msg, false)
})

socket.on('usersList', function(users) {
	renderUsers(users)
})

socket.on('privateMessage', function(msg) {
	console.log('Private Message:', msg)
})
