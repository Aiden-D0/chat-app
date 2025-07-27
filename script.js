const db = firebase.database();
let currentRoom = "";

function joinRoom() {
  const code = document.getElementById("roomCode").value.trim();
  if (!code) return alert("Enter a room code.");

  currentRoom = code;
  document.querySelector(".menu").style.display = "none";
  document.querySelector(".chat").style.display = "block";
  document.getElementById("roomDisplay").textContent = code;

  db.ref(`rooms/${code}/messages`).on("child_added", (snapshot) => {
    const msg = snapshot.val();
    const el = document.createElement("div");
    el.textContent = msg;
    document.getElementById("messages").appendChild(el);
  });
}

function sendMessage() {
  const input = document.getElementById("messageInput");
  const msg = input.value.trim();
  if (!msg) return;

  db.ref(`rooms/${currentRoom}/messages`).push(msg);
  input.value = "";
}

