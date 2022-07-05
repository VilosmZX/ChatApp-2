const socket = io();

const currentName = document.querySelector('.yourname span').innerText;

const sendBtn = document.querySelector(".send__button");
const msgText = document.querySelector("input");
const messages = document.querySelector("ul");

socket.emit("new_user", currentName);

const sendMsg = () => {
  if (msgText.value) {
    const item = document.createElement("li");
    const div = document.createElement("div");
    div.classList.add("yourmsg__container");
    item.classList.add("yourmsg");
    item.innerText = msgText.value;
    div.appendChild(item);
    messages.appendChild(div);
    socket.emit("incoming_chat", currentName, msgText.value);
    messages.scrollTo(0, messages.scrollHeight);
    msgText.value = "";
  }
};


document.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
    sendBtn.click();
  }
});

socket.on("incoming_chat", (name, msg) => {
  const item = document.createElement("li");
  const div = document.createElement("div");
  div.classList.add("msg__container");
  item.innerText = `${name}: ${msg}`;
  if (name.toLowerCase() === "joshuarvl") item.classList.add("owner");
  div.appendChild(item);
  messages.appendChild(div);
  messages.scrollTo(0, messages.scrollHeight);
});

// socket.on("change_name", (oldName, newName) => {
//   const item = document.createElement("li");
//   const div = document.createElement("div");
//   div.classList.add("msg__container");
//   item.innerText = `[BROADCAST] ${oldName} mengganti namanya menjadi ${newName}`;
//   item.classList.add("broadcast");
//   div.appendChild(item);
//   messages.appendChild(div);
//   messages.scrollTo(0, messages.scrollHeight);
// });

socket.on("new_user", (name) => {
  const item = document.createElement("li");
  const div = document.createElement("div");
  div.classList.add("msg__container");
  if (name.toLowerCase() === "joshuarvl")
    item.innerText = `[BROADCAST] OWNER ${name} telah bergabung ke dalam chat!`;
  else item.innerText = `[BROADCAST] ${name} telah bergabung ke dalam chat!`;
  item.classList.add("broadcast");
  div.appendChild(item);
  messages.appendChild(div);
  messages.scrollTo(0, messages.scrollHeight);
});