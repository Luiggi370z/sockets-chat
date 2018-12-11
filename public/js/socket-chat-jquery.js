var params = new URLSearchParams(window.location.search)
var userName = params.get('name')
var divUsers = $('#divUsers')
var formSend = $('#formSend')
var txtMessage = $('#txtMessage')
var divChatBox = $('#divChatbox')

function renderUsers(users) {
	var html = ''

	html += `<li>
	        	<a href="javascript:void(0)" class="active">
	        		Room Chat <span>${params.room}</span></a>
	        </li>`

	users.forEach(user => {
		html += `<li>
                    <a data-id="${user.id}" href="javascript:void(0)"
                        ><img
                            src="assets/images/users/1.jpg"
                            alt="user-img"
                            class="img-circle"
                        />
                        <span>
                            ${user.name}
                            <small class="text-success">online</small></span
                        ></a
                    >
                </li>`
	})

	divUsers.html(html)
}

function renderMessage(message, me) {
	var date = new Date(message.date)
	var time = `${date.getHours()}:${date.getMinutes()}`
	var isAdmin = message.name === 'Admin'

	var adminClass = 'info'

	if (isAdmin) adminClass = 'danger'

	var html = `<li class="animated fade-in ${me ? 'reverse' : ''}">${
		isAdmin
			? ''
			: `<div class="chat-img">
            <img src="assets/images/users/1.jpg" alt="user" />
            </div>`
	}
        <div class="chat-content">
            <h5>${me ? 'Me' : message.name}</h5>
            <div class="box bg-light-${me ? 'inverse' : adminClass}">
                ${message.message}
            </div>
        </div>
        <div class="chat-time">${time}</div>
    </li>`

	divChatBox.append(html)

	scrollToBottom()
}

divUsers.on('click', 'a', function() {
	var id = $(this).data('id')

	if (id) {
		console.log(id)
	}
})

formSend.on('submit', function(e) {
	e.preventDefault()
	var message = txtMessage.val().trim()

	if (!message) return

	socket.emit(
		'sendMessage',
		{
			user: userName,
			message
		},
		function(msg) {
			txtMessage.val('').focus()
			renderMessage(msg, true)
		}
	)
})

function scrollToBottom() {
	// selectors
	var newMessage = divChatBox.children('li:last-child')

	// heights
	var clientHeight = divChatBox.prop('clientHeight')
	var scrollTop = divChatBox.prop('scrollTop')
	var scrollHeight = divChatBox.prop('scrollHeight')
	var newMessageHeight = newMessage.innerHeight()
	var lastMessageHeight = newMessage.prev().innerHeight() || 0

	if (
		clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
		scrollHeight
	) {
		divChatBox.scrollTop(scrollHeight)
	}
}
