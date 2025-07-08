import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

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
  });
}

export { db };
