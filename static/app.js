function displayChat(chat) {
  const ul = document.querySelector("#chat-ul");
  const ul_chat = document.createElement("ul");

  ul_chat.innerText = `[${chat.hour}:${chat.min}] ${chat.content}`;
  ul_chat.style = "padding-bottom:10px;";

  ul.appendChild(ul_chat);
}

async function readChat() {
  const res = await fetch("/chat");
  const jsonRes = await res.json();
  const ul = document.querySelector("#chat-ul");
  ul.innerHTML = "";
  jsonRes.forEach(displayChat);
}

//채팅 생성하는 함수
async function createChat(value) {
  const 응답 = await fetch("/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      hour: new Date().getHours(),
      min: new Date().getMinutes(),
      content: value,
    }),
  });

  readChat();
}

//제출했을 때 동작하는 함수
const handleSubmit = (event) => {
  event.preventDefault();
  const chat_input = document.querySelector("#msg-bar__input");

  createChat(chat_input.value);
  chat_input.value = "";
};

const form = document.querySelector("#chat-form");
form.addEventListener("submit", handleSubmit);

readChat();
