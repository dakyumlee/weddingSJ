import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAbaauVIvPWPT1O_h4kElc0nVkfPaiTbl4",
  authDomain: "poetic-planet-462812-f5.firebaseapp.com",
  projectId: "poetic-planet-462812-f5",
  storageBucket: "poetic-planet-462812-f5.appspot.com",
  messagingSenderId: "375231510481",
  appId: "1:375231510481:web:5c06868eac02b01e0352f0",
  measurementId: "G-EC6J2HWNQ6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const guestbookList = document.getElementById("guestbook-list");
const statsChart = document.getElementById("rsvp-chart");

async function loadGuestbook() {
  const q = query(collection(db, "guestbook"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  guestbookList.innerHTML = "";
  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const div = document.createElement("div");
    div.className = "gb-item";
    div.innerHTML = `
      <strong>${data.name}</strong><br>
      <em>${data.message}</em><br>
      <button onclick="deleteGuestbook('${docSnap.id}')">삭제</button>
      <hr>
    `;
    guestbookList.appendChild(div);
  });
}

window.deleteGuestbook = async function (id) {
  if (confirm("삭제하시겠습니까?")) {
    await deleteDoc(doc(db, "guestbook", id));
    alert("삭제됨");
    loadGuestbook();
  }
};

async function drawRSVPStats() {
  const q = query(collection(db, "rsvps"));
  const snapshot = await getDocs(q);

  let attend = 0, absent = 0, unknown = 0;
  snapshot.forEach((doc) => {
    const status = doc.data().status;
    if (status === "참석") attend++;
    else if (status === "불참") absent++;
    else unknown++;
  });

  statsChart.innerHTML = `<p>참석: ${attend} / 불참: ${absent} / 미정: ${unknown}</p>`;
}

loadGuestbook();
drawRSVPStats();
