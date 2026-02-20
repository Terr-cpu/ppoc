document.getElementById("formDisponibilidad")
.addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  // Convertir checkboxes no marcados a false
  const checkboxes = [
    "mar_manana","mar_tarde",
    "jue_manana","jue_tarde",
    "vie_manana","vie_tarde",
    "sab_manana","dom_manana"
  ];

  checkboxes.forEach(c => {
    data[c] = data[c] ? true : false;
  });

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
