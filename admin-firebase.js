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

const rsvpList = document.getElementById("rsvp-list");

async function loadRSVPs() {
  const q = query(collection(db, "rsvps"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  rsvpList.innerHTML = "";
  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const div = document.createElement("div");
    div.className = "rsvp-item";
    div.innerHTML = `
      <strong>${data.name}</strong> (${data.status})<br>
      <em>${data.message}</em><br>
      <button onclick="deleteRSVP('${docSnap.id}')">삭제</button>
      <hr>
    `;
    rsvpList.appendChild(div);
  });
}

window.deleteRSVP = async function (id) {
  if (confirm("정말 삭제하시겠습니까?")) {
    await deleteDoc(doc(db, "rsvps", id));
    alert("삭제되었습니다.");
    loadRSVPs();
  }
};

loadRSVPs();
