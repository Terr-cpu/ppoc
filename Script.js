const days = [
  "Martes Mañana",
  "Martes Tarde",
  "Jueves Mañana",
  "Jueves Tarde",
  "Viernes Mañana",
  "Viernes Tarde",
  "Sábado Mañana",
  "Domingo Mañana"
];

function createToggle(label, container) {
  const div = document.createElement("div");
  div.className = "toggle";
  div.innerText = label;
  div.onclick = () => div.classList.toggle("active");
  container.appendChild(div);
}

const baseGrid = document.getElementById("baseGrid");
days.forEach(day => createToggle(day, baseGrid));

function addException() {
  const container = document.getElementById("exceptionsContainer");

  const wrapper = document.createElement("div");
  wrapper.className = "card";

  const weekInput = document.createElement("input");
  weekInput.type = "week";
  weekInput.className = "week-input";

  const grid = document.createElement("div");
  grid.className = "availability-grid";

  days.forEach(day => createToggle(day, grid));

  wrapper.appendChild(weekInput);
  wrapper.appendChild(grid);
  container.appendChild(wrapper);
}

function submitForm() {
  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!nombre || !email) {
    showToast("Completa los datos personales");
    return;
  }

  showToast("Formulario listo para conectar con backend ✔");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}
