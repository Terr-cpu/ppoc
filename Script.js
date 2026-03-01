const dias = [
  { id: "mar_m", label: "Martes Mañana" },
  { id: "mar_t", label: "Martes Tarde" },
  { id: "jue_m", label: "Jueves Mañana" },
  { id: "jue_t", label: "Jueves Tarde" },
  { id: "vie_m", label: "Viernes Mañana" },
  { id: "vie_t", label: "Viernes Tarde" },
  { id: "sab_m", label: "Sábado Mañana" },
  { id: "dom_m", label: "Domingo Mañana" }
];

function createToggle(day, container) {
  const div = document.createElement("div");
  div.className = "toggle";
  div.dataset.id = day.id;
  div.innerText = day.label;
  div.onclick = () => div.classList.toggle("active");
  container.appendChild(div);
}

const baseGrid = document.getElementById("baseGrid");
dias.forEach(day => createToggle(day, baseGrid));

function addException() {
  const container = document.getElementById("exceptionsContainer");

  const card = document.createElement("div");
  card.className = "card";

  const weekInput = document.createElement("input");
  weekInput.type = "week";
  weekInput.className = "week-selector";

  const grid = document.createElement("div");
  grid.className = "grid";

  dias.forEach(day => createToggle(day, grid));

  card.appendChild(weekInput);
  card.appendChild(grid);
  container.appendChild(card);
}

function submitForm() {
  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!nombre || !email) {
    showToast("Completa todos los campos");
    return;
  }

  const base = [...document.querySelectorAll("#baseGrid .active")]
    .map(el => el.dataset.id);

  const exceptions = [];
  document.querySelectorAll("#exceptionsContainer .card")
    .forEach(card => {
      const semana = card.querySelector(".week-selector").value;
      const disponibilidad = [...card.querySelectorAll(".active")]
        .map(el => el.dataset.id);
      if (semana) {
        exceptions.push({ semana, disponibilidad });
      }
    });

  const data = {
    nombre,
    email,
    base,
    exceptions
  };

  fetch("https://script.google.com/macros/s/AKfycbzCJhZ4f9kBKWoIm-H05zuWe0RHkf1lUvOwXaAYYv30CXRRWEya8WEGj1Wlk6-McNRuEg/exec", {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(() => {
    showToast("Disponibilidad enviada correctamente");
  })
  .catch(() => {
    showToast("Error al enviar");
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}
