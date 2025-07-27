const db = firebase.database();
let currentRoom = "";

// Generate random 5-character alphanumeric room code
function generateRoomCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function createRoom() {
  const code = generateRoomCode();

  db.ref(`rooms/${code}`).set({ createdAt: Date.now() }).then(() => {
    alert(`Room created! Code: ${code}`);
    startChatRoom(code);
  }).catch((err) => {
    alert("Error creating room: " + err);
  });
}

function joinRoom() {
  const code = document.getElementById("roomCode").value.trim().toUpperCase();
  if (!code) return alert("Enter a room code to join.");

  db.ref(`rooms/${code}`).get().then((snapshot) => {
    if (snapshot.exists()) {
      startChatRoom(code);
    } else {
      alert("Room does not exist!");
    }
  });
}

function startChatRoom(code) {
  currentRoom = code;
  document.querySelector(".menu").style.display = "none";
  document.querySelector(".chat").style.display = "block";
  document.getElementById("roomDisplay").textContent = code;

  const messagesRef = db.ref(`rooms/${code}/messages`);
  messagesRef.off(); // remove previous listeners just in case

  messagesRef.on("child_added", (snapshot) => {
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
