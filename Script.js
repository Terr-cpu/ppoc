const APP_URL = "https://script.google.com/macros/s/AKfycbxmoMhbbY6qN-rXdz5N8KFKZQLQbvaHIkUEZNPBFL4HBP0Jxn62SeRO058CqyENYQZE/exec"; // Pega aquí la URL de la nueva implementación

const form = document.getElementById('dispoForm');
const btn = document.getElementById('btnSubmit');
const feedback = document.getElementById('feedback');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    btn.disabled = true;
    btn.textContent = "Enviando...";
    feedback.className = "mt-3 alert alert-info";
    feedback.textContent = "Procesando envío...";
    feedback.classList.remove('d-none');

    const formData = new FormData(form);
    const params = new URLSearchParams();
    
    params.append('nombre', formData.get('nombre'));

    const campos = ['Martes_M', 'Martes_T', 'Jueves_M', 'Jueves_T', 'Viernes_M', 'Viernes_T', 'Sabado_M', 'Domingo_M'];
    
    campos.forEach(campo => {
        const valor = formData.get(campo);
        params.append(campo, valor === "on" ? "SÍ" : "NO");
    });

    // Usamos el método tradicional de envío para evitar problemas de CORS estrictos
fetch(APP_URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params.toString()
})
.then(response => response.json())
.then(data => {
    if (data.status === "success") {
        feedback.className = "mt-3 alert alert-success fw-bold";
        feedback.textContent = "✅ ¡Disponibilidad enviada con éxito!";
        form.reset();
    } else {
        throw new Error(data.message);
    }
})
.catch(error => {
    console.error("Error real:", error);
    feedback.className = "mt-3 alert alert-danger";
    feedback.textContent = "❌ Error al enviar.";
})
.finally(() => {
    btn.disabled = false;
    btn.textContent = "ENVIAR DISPONIBILIDAD";
});
