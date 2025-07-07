import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAbaauVIvPWPT1O_h4kElc0nVkfPaiTbl4",
  authDomain: "poetic-planet-462812-f5.firebaseapp.com",
  projectId: "poetic-planet-462812-f5",
  storageBucket: "poetic-planet-462812-f5.firebasestorage.app",
  messagingSenderId: "375231510481",
  appId: "1:375231510481:web:5c06868eac02b01e0352f0",
  measurementId: "G-EC6J2HWNQ6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const rsvpForm = document.querySelector(".rsvp-form");
const guestbook = document.getElementById("guestbook");

if (rsvpForm) {
  rsvpForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = rsvpForm.querySelector("input[type='text']").value;
    const status = rsvpForm.querySelector("select").value;
    const message = rsvpForm.querySelector("textarea").value;
    const password = rsvpForm.querySelector("input[type='password']").value;

    await addDoc(collection(db, "rsvps"), {
      name,
      status,
      message,
      password,
      createdAt: serverTimestamp()
    });

    alert("참석 여부가 제출되었습니다!");
    rsvpForm.reset();
    loadMessages();
  });
}

async function loadMessages() {
  guestbook.innerHTML = "";
  const q = query(collection(db, "rsvps"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const div = document.createElement("div");
    div.innerHTML = `
      <p><strong>${data.name}</strong> (${data.status})</p>
      <p>${data.message}</p>
      <button onclick="deleteMessage('${docSnap.id}')">삭제</button>
      <input type="password" placeholder="비밀번호">
    `;
    guestbook.appendChild(div);
  });
}

window.deleteMessage = async (id) => {
  const div = [...guestbook.children].find(el => el.innerHTML.includes(id));
  const pwInput = div.querySelector("input[type='password']");
  const userPw = pwInput.value;

  const docRef = doc(db, "rsvps", id);
  const snapshot = await getDocs(query(collection(db, "rsvps")));
  const match = snapshot.docs.find(d => d.id === id && d.data().password === userPw);

  if (match) {
    await deleteDoc(docRef);
    alert("삭제되었습니다");
    loadMessages();
  } else {
    alert("비밀번호가 일치하지 않습니다");
  }
};

loadMessages();