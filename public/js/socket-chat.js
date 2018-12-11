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
		console.log('Connected Users', res)
	})
})

socket.on('disconnect', function() {
	console.log('Connection with server lost!')
})

socket.emit(
	'sendMessage',
	{
		user: 'Luis',
		message: 'Hello world!'
	},
	function(res) {
		console.log('Server res:', res)
	}
)

socket.on('sendMessage', function(msg) {
	console.log('New message:', msg)
})

socket.on('notification', function(msg) {
	console.log('Server:', msg)
})

socket.on('usersList', function(users) {
	console.log('Server:', users)
})

socket.on('privateMessage', function(msg) {
	console.log('Private Message:', msg)
})
