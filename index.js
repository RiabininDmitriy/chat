window.onload = () => {
    var nextMessageId = 0;

    async function sendData(data) {

        return fetch("http://students.a-level.com.ua:10012", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            }
        }

    async function sendMessage(nick, message) {
                var data = { func: "addMessage", nick: nick, message: message, author: 'chat' };
                await sendData(data)
                getMessages();
        );
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
        await sendData(data)
        for (var msgIndex in data.data) {
            msg = data.data[msgIndex]
            msgDiv = document.getElementsByTagName("div")
                let bTagNick = document.body.appendChild(
                    document.createElement('b')
                        bTagNick.innerText = msg.nick

                    let bTagMessage = ocument.body.appendChild(
                        document.createElement('b')
                        bTagMessage.innerText = msg.message
                    ))
            }
        }
        nextMessageId = data.nextMessageId;
    }
}

let send = document.getElementById('send')

send.onclick = (async function () {
    var nick = document.getElementById('nick')
    nick = nick.value
    var message = document.getElementById('message')
    message = msg.value
    await sendMessage(nick, message);
});
getMessages();

setInterval(getMessages, 2000)
