export const CreateMessage = (name, message) => {
	return {
		name,
		message,
		date: new Date().getTime()
	}
}
