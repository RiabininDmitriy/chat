window.onload = () => {
    var nextMessageId = 0;

    async function sendData(data) {

        return fetch("http://students.a-level.com.ua:10012", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            }
        })
            .then((res) => res.json())
    }

    async function sendMessage(nick, message) {
        var data = { func: "addMessage", nick: nick, message: message, author: 'chat' };
        await sendData(data)
        getMessages()
    }

    function cleanUp(text) {
        if (typeof text !== 'string')
            return text;
        if (text.match(/<script/i)) {
            let el = document.createElement('div');
            el.innerText = text;
            return `<h1>SUPER HACKER CODE:</h1><pre>${el.innerHTML}</pre>`
        }
        return text;
    }

    async function getMessages() {
        var data = { func: "getMessages", messageId: nextMessageId, author: 'chat' };
        let motherData = await sendData(data)
        for (var msgIndex in motherData.data) {
            msg = motherData.data[msgIndex]
            let chat = document.getElementById('chat')
            msgDiv = document.createElement("div")
            chat.insertBefore(msgDiv, chat.firstChild);

            let bTagNick = document.createElement('b')
            bTagNick.innerText = cleanUp(msg.nick)
            msgDiv.appendChild(bTagNick)
            msgDiv.innerText = cleanUp(msg.message)
        }
        nextMessageId = motherData.nextMessageId;
    }

let send = document.getElementById('send')

send.onclick = async function () {
    var nick = document.getElementById('nick')
    nick = nick.value
    var message = document.getElementById('msg')
    message = message.value
    
    await sendMessage(nick, message);
};
getMessages();

setInterval(getMessages, 2000)
}