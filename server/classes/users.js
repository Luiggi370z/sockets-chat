class Chat {
	constructor() {
		this.users = []
	}

	addUser(user) {
		this.users.push(user)
		return this.users
	}

	getUser(id) {
		return this.users.filter(x => x.id === id)[0]
	}

	getAll() {
		return this.users
	}

	getUserByRoom(room) {
		return this.users.filter(x => x.room === room)
	}

	removeUser(id) {
		const removedUser = this.getUser(id)
		this.users = this.users.filter(x => x.id !== id)
		return removedUser
	}
}

export default Chat
