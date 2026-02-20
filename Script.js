document.getElementById("formDisponibilidad")
.addEventListener("submit", function(e) {
  e.preventDefault();

  const dias = [
  "Martes Mañana",
  "Martes Tarde",
  "Jueves Mañana",
  "Jueves Tarde",
  "Viernes Mañana",
  "Viernes Tarde",
  "Sábado Mañana",
  "Domingo Mañana"
];

const baseGrid = document.getElementById("baseGrid");

dias.forEach(d => {
  const div = document.createElement("div");
  div.className = "toggle";
  div.innerHTML = `<span>${d}</span>`;
  div.onclick = () => div.classList.toggle("active");
  baseGrid.appendChild(div);
});

function addException(){
  const container = document.getElementById("exceptionsContainer");

  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <input type="week" class="weekSelector">
    <div class="grid"></div>
  `;

  const grid = card.querySelector(".grid");

  dias.forEach(d => {
    const div = document.createElement("div");
    div.className = "toggle";
    div.innerHTML = `<span>${d}</span>`;
    div.onclick = () => div.classList.toggle("active");
    grid.appendChild(div);
  });

  container.appendChild(card);
}

  fetch("https://script.google.com/macros/s/AKfycbzCJhZ4f9kBKWoIm-H05zuWe0RHkf1lUvOwXaAYYv30CXRRWEya8WEGj1Wlk6-McNRuEg/exec", {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(response => {
    document.getElementById("mensaje").innerText = 
      "Disponibilidad enviada correctamente ✔";
    document.getElementById("formDisponibilidad").reset();
  })
  .catch(error => {
    document.getElementById("mensaje").innerText = 
      "Error al enviar. Inténtalo de nuevo.";
  });
});
