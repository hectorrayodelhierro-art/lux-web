// === FIREBASE CONFIG ===
const firebaseConfig = {
  apiKey: "AIzaSyBuNM49-EzyapHbDtYSbA69_YFkfWkLhSGI",
  authDomain: "luxweb-2bad4.firebaseapp.com",
  projectId: "luxweb-2bad4",
  storageBucket: "luxweb-2bad4.appspot.com",
  messagingSenderId: "336678426763",
  appId: "1:336678426763:web:c1ad7262577d8684150910",
  measurementId: "G-EB03V7W2ZN"
};

// Iniciar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// === ESTRELLAS ===
document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll(".stars");

  containers.forEach(container => {
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("span");
      star.textContent = "★";
      star.classList.add("star");
      star.dataset.value = i;
      container.appendChild(star);
    }

    container.addEventListener("click", e => {
      if (!e.target.classList.contains("star")) return;
      const score = parseInt(e.target.dataset.value);
      fillStars(container, score);
    });
  });

  document.getElementById("submitLux").addEventListener("click", guardarLux);
});

function fillStars(container, score) {
  const stars = container.querySelectorAll(".star");
  stars.forEach(s => {
    s.classList.toggle("filled", parseInt(s.dataset.value) <= score);
  });
  container.dataset.score = score;
}

// === GUARDAR EN FIRESTORE ===
async function guardarLux() {
  const mejores = document.getElementById("best-songs").value.trim();
  const peores = document.getElementById("worst-songs").value.trim();
  const puntuacion = document.getElementById("global-score").value.trim();

  const canciones = [];
  document.querySelectorAll(".tracklist li").forEach(li => {
    const nombre = li.querySelector("span").textContent.trim();
    const score = parseInt(li.querySelector(".stars").dataset.score || 0);
    canciones.push({ nombre, score });
  });

  try {
    await db.collection("respuestas_lux").add({
      timestamp: new Date(),
      mejores,
      peores,
      puntuacion,
      canciones
    });
    alert("✅ ¡Tu respuesta se ha guardado correctamente!");
  } catch (e) {
    console.error(e);
    alert("❌ Error al guardar.");
  }
}
