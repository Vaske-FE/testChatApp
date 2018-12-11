window.onload = function () {
    $.ajax("json/conversations.json", {
        method: "GET",
        dataType: "json",
        success: function (conversations) {
            console.log(conversations);
            var divChatMessage = document.querySelector("#chatText");
            var chatPerson = document.querySelector("#chatting");
            conversations.forEach(function (message) {
                chatPerson.innerHTML += `<div class="personname">
                <img src="${message.src}">
                <div class="test">
                    <p class="name">${message.name}</p>
                    <span class="status">${message.status}</span>
                </div>
                </div>
                `;
            })
            var personName = document.querySelectorAll(".personname");
            console.log(personName)
            personName.forEach(function (person) {
                person.addEventListener("click", ispisiPoruke);
            });

        },
        error: function (_err) {
            console.error(_err);
        }
    })

}
function ispisiPoruke() {
    console.log(this)
    var divTest = this.children[1];
    var pTagName = divTest.children[0];
    var name = pTagName.textContent;
    console.log(name)
    
    $.ajax("json/conversations.json", {
        method: "GET",
        dataType: "json",
        success: function (conversations) {
            var divChatMessage = document.querySelector("#chatText");
            divChatMessage.innerHTML = "";
            conversations.forEach(function (message) {
                if (message.name === name){
                    var poslatePoruke = message.sent_messages.map(function(sentMessage) {
                        sentMessage.sent = true;
                        return sentMessage;
                    });
                    var primljenePoruke = message.received_messages.map(function(receivedMessage) {
                        receivedMessage.received = true;
                        return receivedMessage;
                    });
                    var poruke = [];
                    poruke = poruke.concat(poslatePoruke, primljenePoruke);
                    console.log(poruke)
                    poruke.sort(function (a, b){
                        return a - b;
                    });
                    poruke.forEach (function (poruka){
                        if (poruka.sent){
                            divChatMessage.innerHTML += `
                            <div class="mychat">
                            <p class="chat-message">${poruka.content}</p>
                            </div>`;
                            
                        } else {
                            divChatMessage.innerHTML += `<div class="friendchat">
                            <p class="chat-message">${poruka.content}</p>
                        </div>
                            `
                        }
                    
                    });
                }
            
            }) 
        }
     })
        
}